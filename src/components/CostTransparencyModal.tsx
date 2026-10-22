import React from 'react';
import { 
  ShieldCheck, 
  Check, 
  HelpCircle, 
  X, 
  Calculator, 
  Mail, 
  PackageCheck, 
  Mic, 
  Sparkles,
  Zap
} from 'lucide-react';

interface CostTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CostTransparencyModal: React.FC<CostTransparencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              LogiMate AI — Free Tier & Cost Transparency
            </h3>
            <p className="text-xs text-slate-400">
              Clear breakdown of free features and zero-cost design for your Dubai logistics workflow.
            </p>
          </div>
        </div>

        {/* Answer Summary Card */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5">
          <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
            <Check className="w-4 h-4" />
            <span>Do any features require payment? NO. Everything is 100% Free!</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All core logistics tools run directly on your browser without any subscription, credits, or payment methods. The optional AI features use Google Gemini 3.8 Flash on Google AI Studio's free tier.
          </p>
        </div>

        {/* Feature Breakdown Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Detailed Feature Cost Audit:
          </h4>

          <div className="space-y-2.5">
            {/* 1. CBM Calculator */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <Calculator className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">CBM & Volumetric Calculator</p>
                  <p className="text-[11px] text-slate-400">
                    Runs 100% on pure mathematical JavaScript algorithms inside your browser. Requires zero API calls, works offline, and will always be 100% free.
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                100% Free (Offline)
              </span>
            </div>

            {/* 2. Warehouse GRN / GDN Assistant */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <PackageCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Warehouse GRN / GDN & Slips</p>
                  <p className="text-[11px] text-slate-400">
                    Creates official printable Goods Received & Dispatch slips and formats instant WhatsApp status reports. Stored safely in your browser storage.
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                100% Free (Local)
              </span>
            </div>

            {/* 3. Spoken English Audio Pronunciation */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <Mic className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Audio Speech Coach (SpeechSynthesis)</p>
                  <p className="text-[11px] text-slate-400">
                    Uses the native Web Speech API built into Google Chrome, Safari, and Edge. Zero third-party audio API fees.
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                100% Free (Native)
              </span>
            </div>

            {/* 4. Logistics Email Templates & Tanglish Knowledge */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Pre-built Dubai Email & Coach Scenarios</p>
                  <p className="text-[11px] text-slate-400">
                    Comprehensive Jebel Ali demurrage waiver, customs inspection, and rate quotation templates are pre-packaged directly in the app.
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                100% Free (Built-in)
              </span>
            </div>

            {/* 5. AI Polishing (Gemini 3.8 Flash) */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Gemini 3.8 Flash AI Enhancement</p>
                  <p className="text-[11px] text-slate-400">
                    Available for custom email variations and interactive Tanglish coaching. Uses Google AI Studio's free tier quotas with no credit card required.
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                AI Studio Free Tier
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center space-x-1 text-[11px] text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Built tailored for Dubai Logistics Account Leaders</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
