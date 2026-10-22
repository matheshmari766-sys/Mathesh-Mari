import React, { useState, useMemo } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  ExternalLink, 
  Sliders, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { EmailCategory, EmailTemplateDef } from '../types';
import { DUBAI_EMAIL_TEMPLATES, renderEmailTemplate } from '../utils/dubaiLogisticsTemplates';

export const EmailWriter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<EmailCategory>('demurrage_waiver');
  const [tone, setTone] = useState<'formal' | 'polite' | 'urgent' | 'friendly'>('formal');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiCustomInstruction, setAiCustomInstruction] = useState('');
  const [aiEnhancedBody, setAiEnhancedBody] = useState<string | null>(null);

  // Active template definition
  const currentTemplate = useMemo(() => {
    return DUBAI_EMAIL_TEMPLATES.find((t) => t.id === selectedCategory) || DUBAI_EMAIL_TEMPLATES[0];
  }, [selectedCategory]);

  // Variables state
  const [variables, setVariables] = useState<Record<string, string>>(currentTemplate.defaultVariables);

  // Reset variables whenever template changes
  const handleSelectTemplate = (category: EmailCategory) => {
    setSelectedCategory(category);
    const tmpl = DUBAI_EMAIL_TEMPLATES.find((t) => t.id === category) || DUBAI_EMAIL_TEMPLATES[0];
    setVariables(tmpl.defaultVariables);
    setAiEnhancedBody(null);
    setAiCustomInstruction('');
  };

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
    setAiEnhancedBody(null);
  };

  // Base rendered content from offline template
  const baseRendered = useMemo(() => {
    return renderEmailTemplate(currentTemplate, variables);
  }, [currentTemplate, variables]);

  const activeBody = aiEnhancedBody || baseRendered.body;

  // Handle AI Polish using server-side Gemini 3.8 Flash
  const handleAiPolish = async () => {
    setAiGenerating(true);
    try {
      const promptText = `You are an expert Dubai Freight & Logistics Account Leader.
Polish and refine the following business email for logistics operations in Dubai, UAE (DP World Jebel Ali, Dubai Customs Mirsal 2, shipping lines).

Current Email Subject: ${baseRendered.subject}
Tone Selected: ${tone} (Options: formal, polite, urgent, friendly)
User Specific Instructions: ${aiCustomInstruction || 'Make it crisp, professional, and compliant with UAE corporate standards.'}

Original Email Body:
${baseRendered.body}

Please return ONLY the refined email body without conversational filler. Keep all key details (BL numbers, Container IDs, AED amounts, dates) strictly intact.`;

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          systemInstruction: 'You are an executive logistics account leader in Dubai. Provide direct polished email drafts with impeccable business English and UAE logistics etiquette.',
        }),
      });

      const data = await response.json();
      if (data.success && data.text) {
        setAiEnhancedBody(data.text);
      } else {
        // High quality offline fallback polish
        let modified = baseRendered.body;
        if (tone === 'urgent') {
          modified = `[URGENT ESCALATION]\n` + modified.replace(/Warm regards|Best regards/g, 'Urgent assistance requested,\nRespectfully');
        } else if (tone === 'polite') {
          modified = modified.replace(/We respectfully request/g, 'We would be immensely grateful if your esteemed team could kindly consider our request');
        }
        setAiEnhancedBody(modified);
      }
    } catch (err) {
      console.warn('AI polish unavailable, maintaining offline template:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleCopy = () => {
    const fullText = `Subject: ${baseRendered.subject}\n\n${activeBody}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailto = () => {
    const subjectEncoded = encodeURIComponent(baseRendered.subject);
    const bodyEncoded = encodeURIComponent(activeBody);
    window.location.href = `mailto:?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const handleResetToTemplate = () => {
    setAiEnhancedBody(null);
    setVariables(currentTemplate.defaultVariables);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400 shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">Dubai Logistics Professional Email Writer</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Customs & Carrier Etiquette
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Instantly draft formal correspondence for DP World, shipping lines (MSC, Maersk), Dubai Customs Mirsal 2, and VIP consignees.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
          </button>
          <button
            onClick={handleMailto}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Open in Mail App</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Template Selection & Inputs (5 cols) + Email Preview & AI Polish (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Template Selector & Field Variables */}
        <div className="lg:col-span-5 space-y-5">
          {/* Category Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              1. Select Dubai Logistics Scenario
            </label>
            <div className="space-y-2">
              {DUBAI_EMAIL_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                    selectedCategory === tmpl.id
                      ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{tmpl.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{tmpl.description}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 shrink-0">
                    {tmpl.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Fill Variables Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Shipment Details & Variables
              </label>
              <button
                onClick={handleResetToTemplate}
                className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Fields</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {Object.keys(currentTemplate.defaultVariables).map((key) => {
                const hint = currentTemplate.variableHints[key] || key;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <span className="text-[10px] text-slate-500">{hint}</span>
                    </div>
                    <input
                      type="text"
                      value={variables[key] || ''}
                      onChange={(e) => handleVariableChange(key, e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Email Live Preview & AI Polish Tools */}
        <div className="lg:col-span-7 space-y-5">
          {/* Controls Bar: Tone & AI Action */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-300">Tone:</span>
              <div className="flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
                {(['formal', 'polite', 'urgent', 'friendly'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-all ${
                      tone === t ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAiPolish}
              disabled={aiGenerating}
              className="flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{aiGenerating ? 'Polishing Draft...' : 'Polish with AI (Gemini)'}</span>
            </button>
          </div>

          {/* Optional Prompt instructions for AI */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center space-x-2">
            <input
              type="text"
              value={aiCustomInstruction}
              onChange={(e) => setAiCustomInstruction(e.target.value)}
              placeholder="Optional AI note: e.g. Mention our client is a VIP government supplier in Dubai..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* The Live Email Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            {/* Subject Line */}
            <div className="pb-3 border-b border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                Subject
              </span>
              <div className="text-sm font-bold text-white font-mono bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 select-all">
                {baseRendered.subject}
              </div>
            </div>

            {/* Email Body */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Email Message Body
                </span>
                {aiEnhancedBody && (
                  <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>AI Enhanced Draft</span>
                  </span>
                )}
              </div>

              <textarea
                value={activeBody}
                onChange={(e) => setAiEnhancedBody(e.target.value)}
                rows={16}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed font-sans focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-800">
              <div className="flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Ready to send to Shipping Lines & Consignees</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-amber-400 font-bold hover:underline"
              >
                Copy Full Email Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
