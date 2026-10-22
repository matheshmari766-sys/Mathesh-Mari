import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  CheckCircle2, 
  Lightbulb, 
  ShieldAlert, 
  Compass, 
  Send, 
  RotateCcw,
  Play,
  Square
} from 'lucide-react';
import { SpeakingScenario, TanglishGlossaryItem } from '../types';
import { SPEAKING_SCENARIOS, DUBAI_LOGISTICS_GLOSSARY } from '../utils/tanglishCoachData';
import { playEnglishSpeech, stopEnglishSpeech } from '../utils/speechUtil';

export const SpeakingCoach: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'ask_coach' | 'glossary'>('scenarios');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SPEAKING_SCENARIOS[0].id);
  const [speechRate, setSpeechRate] = useState<number>(0.92);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);

  // Ask Coach Q&A State
  const [userQuestion, setUserQuestion] = useState('');
  const [coachResponse, setCoachResponse] = useState<{
    englishScript: string;
    tanglishExplanation: string;
    proTip: string;
  } | null>({
    englishScript: 'Good morning Mr. Tariq, I hope this finds you well. Regarding shipment BL# 918237, our customs team has submitted the Mirsal 2 declaration and the cargo is scheduled for Bay 4 offloading tomorrow morning. I am personally monitoring the milestone.',
    tanglishExplanation: 'Client kitta pesum pothu: "Good morning [Name]" solli, direct-ah "Mirsal 2 submitted, Bay 4 delivery tomorrow" nu concrete facts kudukkanum. "I am personally monitoring" nu solra word client-ku periya safety feeling tharum.',
    proTip: 'In Dubai logistics, clients hate generic answers like "we are checking". Always mention the next specific milestone (e.g. Bay slot or Mirsal status).'
  });
  const [isAskingAi, setIsAskingAi] = useState(false);

  const activeScenario = SPEAKING_SCENARIOS.find((s) => s.id === selectedScenarioId) || SPEAKING_SCENARIOS[0];

  const categories = ['All', 'Client Relations', 'Shipping Lines', 'Customs & Port', 'Warehouse & Drivers', 'Negotiation'];

  const filteredScenarios = SPEAKING_SCENARIOS.filter((s) => {
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory;
  });

  const handleSpeak = (text: string, id: string) => {
    if (isPlayingAudio === id) {
      stopEnglishSpeech();
      setIsPlayingAudio(null);
      return;
    }

    setIsPlayingAudio(id);
    playEnglishSpeech(
      text,
      speechRate,
      () => setIsPlayingAudio(id),
      () => setIsPlayingAudio(null),
      () => setIsPlayingAudio(null)
    );
  };

  // Ask Coach handler
  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsAskingAi(true);
    try {
      const prompt = `You are an expert English Speaking Coach specializing in teaching Indian Tamil logistics professionals in Dubai, UAE.
User Question (may be in English, Tamil, or Tanglish):
"${userQuestion}"

Please structure your response into 3 parts:
1. ENGLISH PHRASE TO SPEAK: (2-4 sentences of fluent, executive business English tailored for Dubai logistics operations like DP World, Jebel Ali, Mirsal 2 customs, shipping lines, or clients).
2. TANGLISH EXPLANATION: (Clear explanation in Tanglish - Tamil written in English alphabet - explaining the logic, tone, and why to speak like this).
3. DUBAI LOGISTICS PRO TIP: (A practical tip about Dubai customs, port clearance, or etiquette).

Format output clearly with those three headers.`;

      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstruction: 'You are an affectionate and ultra-competent English speaking mentor for a Dubai logistics Account Leader. Explain English nuances in easy, friendly Tanglish.',
        }),
      });

      const data = await res.json();
      if (data.success && data.text) {
        // Parse into 3 blocks or fallback
        const text = data.text;
        const englishPart = text.match(/ENGLISH PHRASE TO SPEAK:\s*([\s\S]*?)(?=TANGLISH EXPLANATION:|$)/i)?.[1]?.trim() || text;
        const tanglishPart = text.match(/TANGLISH EXPLANATION:\s*([\s\S]*?)(?=DUBAI LOGISTICS PRO TIP:|$)/i)?.[1]?.trim() || 'Indha phrase romba professional-ah irukkum. Confidence-oda use pannunga!';
        const proTipPart = text.match(/DUBAI LOGISTICS PRO TIP:\s*([\s\S]*?)$/i)?.[1]?.trim() || 'Always verify BL and Container numbers before confirming dates with Dubai clients.';

        setCoachResponse({
          englishScript: englishPart,
          tanglishExplanation: tanglishPart,
          proTip: proTipPart,
        });
      } else {
        // Offline Tanglish rule fallback
        setCoachResponse({
          englishScript: `Dear Team, we have reviewed the consignment requirements and scheduled the customs clearance at Jebel Ali Terminal for tomorrow morning. All documentation is in order.`,
          tanglishExplanation: `Indha situation-la straight-forward-ah "scheduled tomorrow morning" nu deadline solli, "documentation is in order" nu reassurance tharuvom.`,
          proTip: `Dubai-la customers value proactive updates before they call to ask.`,
        });
      }
    } catch (err) {
      console.warn('Coach request failed, using fallback:', err);
    } finally {
      setIsAskingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400 shrink-0">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">English Speaking Coach (Tanglish)</h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Audio Pronunciation Included
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Master Dubai workplace English with comfort! Real scenarios explained in friendly Tanglish so you speak with 100% confidence.
            </p>
          </div>
        </div>

        {/* Audio Speech Speed Selector */}
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold">Speech Speed:</span>
          <button
            onClick={() => setSpeechRate(0.8)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
              speechRate === 0.8 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            0.8x (Slow Practice)
          </button>
          <button
            onClick={() => setSpeechRate(0.95)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
              speechRate === 0.95 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            1.0x (Normal)
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-800 space-x-4">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'scenarios'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Real Dubai Scenarios ({SPEAKING_SCENARIOS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ask_coach')}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'ask_coach'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Ask the Coach (Tanglish Q&A)</span>
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'glossary'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Dubai Logistics Tanglish Glossary ({DUBAI_LOGISTICS_GLOSSARY.length})</span>
        </button>
      </div>

      {/* TAB 1: Real Dubai Scenarios */}
      {activeTab === 'scenarios' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Category Filters & Scenario List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900 p-2 rounded-xl border border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scenarios List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredScenarios.map((scenario) => {
                const isSelected = scenario.id === activeScenario.id;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenarioId(scenario.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-sm'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {scenario.category}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {scenario.difficulty}
                      </span>
                    </div>
                    <p className="text-xs font-bold line-clamp-1">{scenario.title}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {scenario.situationTanglish}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Coaching View (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {activeScenario.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Level: {activeScenario.difficulty}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                    {activeScenario.title}
                  </h3>
                </div>

                {/* Primary Audio Speak Button */}
                <button
                  onClick={() => handleSpeak(activeScenario.recommendedEnglish, activeScenario.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
                    isPlayingAudio === activeScenario.id
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
                  }`}
                >
                  {isPlayingAudio === activeScenario.id ? (
                    <>
                      <Square className="w-4 h-4 fill-current" />
                      <span>Stop Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Listen to Pronunciation</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tanglish Situation Story */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  <span>Enna Situation? (Context in Tanglish):</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeScenario.situationTanglish}
                </p>
              </div>

              {/* What Client / Counterparty Says */}
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                  What Client / Line says to you:
                </span>
                <p className="text-xs sm:text-sm text-rose-200 font-medium italic">
                  {activeScenario.clientSaysEnglish}
                </p>
              </div>

              {/* Recommended English Response */}
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>How You Should Speak (Exact English Script):</span>
                  </span>
                  <button
                    onClick={() => handleSpeak(activeScenario.recommendedEnglish, activeScenario.id)}
                    className="text-xs text-emerald-300 hover:underline flex items-center space-x-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Audio</span>
                  </button>
                </div>

                <div className="p-3.5 bg-slate-950/90 rounded-lg border border-slate-800">
                  <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                    "{activeScenario.recommendedEnglish}"
                  </p>
                </div>

                <div className="flex items-start space-x-2 text-xs text-emerald-300/90 leading-relaxed pt-1">
                  <span className="font-bold shrink-0">Why this works:</span>
                  <span>{activeScenario.whyThisWorks}</span>
                </div>
              </div>

              {/* In-depth Tanglish Explanation */}
              <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 sm:p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Tanglish Explanation (Yen ippadi pesanum?):
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeScenario.tanglishExplanation}
                </p>
              </div>

              {/* Alternative Phrases */}
              {activeScenario.alternatives.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Alternative Short Ways to Say It:
                  </span>
                  <div className="space-y-2">
                    {activeScenario.alternatives.map((alt, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center justify-between gap-2"
                      >
                        <span className="italic">{alt}</span>
                        <button
                          onClick={() => handleSpeak(alt, `alt-${activeScenario.id}-${i}`)}
                          className="p-1 rounded text-slate-400 hover:text-amber-400 shrink-0"
                          title="Play alternative phrase"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dubai Pro Tip & Key Vocabulary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Pro Tip */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Dubai Industry Secret:</span>
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeScenario.dubaiProTip}
                  </p>
                </div>

                {/* Vocabulary Cards */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Vocabulary (Tanglish Meaning):
                  </span>
                  <div className="space-y-1.5">
                    {activeScenario.keyVocabulary.map((voc, i) => (
                      <div key={i} className="text-xs flex flex-col">
                        <span className="font-bold text-amber-300 font-mono">{voc.term}</span>
                        <span className="text-[11px] text-slate-400">{voc.meaningTanglish}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Ask Coach (Tanglish Q&A) */}
      {activeTab === 'ask_coach' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Ask Anything in English or Tanglish!</h3>
              <p className="text-xs text-slate-300 mt-1">
                Type your question or dilemma (e.g. "Epdi client kitta demurrage charges pay panna sollanum?" or "How to politely ask shipping line for 14 free days"). The coach translates into executive English with pronunciation and Tanglish guidance.
              </p>
            </div>

            {/* Quick Prompt Ideas */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Epdi client kitta payment kekkanum polite-ah?',
                'Tell shipping line driver is waiting at gate 4',
                'Client asks why delivery order is delayed',
                'Negotiate 200 AED discount on local trucking',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setUserQuestion(suggestion)}
                  className="text-[11px] bg-slate-950 hover:bg-slate-800 text-amber-300 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleAskCoach} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={3}
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask in Tanglish or English: e.g. Warehouse supervisor kitta damaged pallet photos eduka sollanum..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isAskingAi || !userQuestion.trim()}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAskingAi ? 'Coach is Thinking...' : 'Get English Script & Tanglish Explanation'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Coach Response Card */}
          {coachResponse && (
            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    🎓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Coach Recommendation</h4>
                    <p className="text-[11px] text-slate-400">Professional Dubai Workplace English</p>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(coachResponse.englishScript, 'coach-answer')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen to English Pronunciation</span>
                </button>
              </div>

              {/* Script Box */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                  Spoken English Script:
                </span>
                <p className="text-sm text-white font-medium leading-relaxed">
                  "{coachResponse.englishScript}"
                </p>
              </div>

              {/* Tanglish Explanation */}
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Tanglish Explanation:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {coachResponse.tanglishExplanation}
                </p>
              </div>

              {/* Pro Tip */}
              {coachResponse.proTip && (
                <div className="flex items-start space-x-2 text-xs text-slate-400">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Dubai Logistics Tip:</strong> {coachResponse.proTip}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Tanglish Glossary */}
      {activeTab === 'glossary' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white">Dubai Logistics Tanglish Dictionary</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Essential shipping, port, customs, and warehouse terms explained simply in Tanglish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DUBAI_LOGISTICS_GLOSSARY.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-amber-400 font-mono">{item.term}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleSpeak(`${item.term}. ${item.meaningEnglish}. For example: ${item.exampleSentence}`, `glossary-${idx}`)}
                      className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-medium">
                  {item.meaningEnglish}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-amber-200/90 leading-relaxed">
                  <span className="font-bold text-amber-400 text-[10px] uppercase block mb-0.5">
                    Tanglish Meaning:
                  </span>
                  {item.tanglishExplanation}
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  <strong>Example:</strong> "{item.exampleSentence}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
