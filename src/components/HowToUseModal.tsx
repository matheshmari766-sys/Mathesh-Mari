import React, { useState } from 'react';
import { 
  BookOpen, 
  Calculator, 
  Mail, 
  PackageCheck, 
  Mic, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  Share2, 
  Volume2,
  ExternalLink
} from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'cbm' | 'email' | 'warehouse' | 'coach') => void;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  const [activeStep, setActiveStep] = useState<'overview' | 'cbm' | 'email' | 'warehouse' | 'coach'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl relative my-8 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              LogiMate AI — Quick Start Guide for Account Leaders
            </h3>
            <p className="text-xs text-slate-400">
              No technical experience required. Here is how to use each tool in your day-to-day Dubai operations.
            </p>
          </div>
        </div>

        {/* Sub-navigation tabs inside guide */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveStep('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 'overview' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            📌 1-Minute Overview
          </button>
          <button
            onClick={() => setActiveStep('cbm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 'cbm' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. CBM Calculator
          </button>
          <button
            onClick={() => setActiveStep('email')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 'email' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Email Writer
          </button>
          <button
            onClick={() => setActiveStep('warehouse')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 'warehouse' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Warehouse Assistant
          </button>
          <button
            onClick={() => setActiveStep('coach')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeStep === 'coach' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. English Coach (Tanglish)
          </button>
        </div>

        {/* STEP CONTENT: OVERVIEW */}
        {activeStep === 'overview' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400">
                Welcome to LogiMate AI! Your All-in-One Dubai Logistics Co-Pilot
              </h4>
              <p className="text-slate-300 leading-relaxed">
                As an Account Leader, your daily job involves calculating cargo volumes, communicating with shipping lines (Maersk, MSC) and clients, coordinating warehouse operations in Jebel Ali / DIC, and speaking fluent English on phone calls.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Everything in this application runs directly in your browser. You can use it on your laptop or mobile phone anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-white font-bold">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>When a client gives package sizes:</span>
                </div>
                <p className="text-slate-400">
                  Open <strong>CBM Calculator</strong>, type the Length, Width, Height, and Quantity. It immediately tells you whether to quote LCL, 20ft, or 40ft container, and what truck to send.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-white font-bold">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>When you need to send an email:</span>
                </div>
                <p className="text-slate-400">
                  Open <strong>Email Writer</strong>, pick a template (Demurrage waiver, Customs hold, Quotation), fill your BL & Container number, and click <strong>Copy Email</strong> to paste into Outlook or Gmail.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-white font-bold">
                  <PackageCheck className="w-4 h-4 text-emerald-400" />
                  <span>When a truck arrives at the warehouse:</span>
                </div>
                <p className="text-slate-400">
                  Open <strong>Warehouse Assistant</strong>, log the GRN with the driver’s plate and seal number. Click <strong>Print Slip</strong> for the driver signature and <strong>WhatsApp</strong> to send an instant update to your client.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-white font-bold">
                  <Mic className="w-4 h-4 text-rose-400" />
                  <span>Before calling a client or shipping line:</span>
                </div>
                <p className="text-slate-400">
                  Open <strong>English Coach</strong>, choose your scenario, read the Tanglish explanation to understand the polite trick, and click <strong>Listen</strong> to hear the exact pronunciation before speaking!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP CONTENT: CBM CALCULATOR */}
        {activeStep === 'cbm' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                <Calculator className="w-4 h-4" />
                <span>How to use the CBM Calculator</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                <li>
                  <strong>Quick Presets:</strong> Click on buttons like <em>"Standard Export Carton"</em> or <em>"Euro Pallet"</em> to auto-fill common Dubai package sizes.
                </li>
                <li>
                  <strong>Custom Sizes:</strong> In any row, type your <strong>Length, Width, Height</strong>, choose the unit (<code>cm</code>, <code>m</code>, <code>in</code>, <code>ft</code>), and enter the <strong>Quantity</strong> and <strong>Weight per Piece</strong>.
                </li>
                <li>
                  <strong>Multiple Cargo Types:</strong> Click <strong>"+ Add Row"</strong> if the shipment contains different box sizes (e.g., 20 big boxes + 50 small cartons).
                </li>
                <li>
                  <strong>Read the Results on the Right:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1 text-slate-400 space-y-1">
                    <li><strong>Total CBM:</strong> Total volume in cubic meters.</li>
                    <li><strong>Container Recommendation:</strong> Tells you whether you need an LCL consolidation, 20ft box, or 40ft High Cube.</li>
                    <li><strong>Air Chargeable Weight:</strong> Automatically compares actual scale weight vs IATA 1:6000 volumetric weight.</li>
                    <li><strong>Truck Fleet Match:</strong> Recommends 1-Ton pickup, 3-Ton pickup, 7-Ton truck, or 40ft trailer.</li>
                  </ul>
                </li>
                <li>
                  <strong>Copy Summary:</strong> Click <strong>"Copy Summary"</strong> at the top to copy a ready-to-send cargo spec table for your client quote or packing list.
                </li>
              </ol>
            </div>

            <button
              onClick={() => {
                onNavigateTab('cbm');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center space-x-2"
            >
              <span>Go to CBM Calculator Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP CONTENT: EMAIL WRITER */}
        {activeStep === 'email' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>How to use the Professional Email Writer</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                <li>
                  <strong>Step 1 - Select Scenario:</strong> Click on the email you need from the list:
                  <ul className="list-disc list-inside ml-4 mt-1 text-slate-400 space-y-0.5">
                    <li><em>Demurrage & Detention Waiver</em> (to Maersk/MSC for Jebel Ali delay)</li>
                    <li><em>Dubai Customs Mirsal 2 Inspection Delay</em> (to update your client calmly)</li>
                    <li><em>Freight Rate Quotation</em> (with full AED breakdown, THC, and 5% VAT)</li>
                    <li><em>Arrival Notice & DO Collection</em>, <em>Warehouse Offloading</em>, etc.</li>
                  </ul>
                </li>
                <li>
                  <strong>Step 2 - Fill Shipment Details:</strong> Enter your BL Number, Container ID, Consignee name, or Dates in the left panel. The preview on the right updates instantly!
                </li>
                <li>
                  <strong>Step 3 - Choose Tone:</strong> Switch between <em>Formal, Polite, Urgent</em>, or <em>Friendly</em>.
                </li>
                <li>
                  <strong>Step 4 - Copy or Send:</strong> Click <strong>"Copy Email"</strong> to paste it into your Outlook, or click <strong>"Open in Mail App"</strong> to launch your mail client with subject and body pre-filled!
                </li>
              </ol>
            </div>

            <button
              onClick={() => {
                onNavigateTab('email');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center space-x-2"
            >
              <span>Go to Email Writer Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP CONTENT: WAREHOUSE ASSISTANT */}
        {activeStep === 'warehouse' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                <PackageCheck className="w-4 h-4" />
                <span>How to use the Warehouse Assistant (GRN / GDN)</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                <li>
                  <strong>Inward Cargo (Truck arriving with goods):</strong> Click <strong>"+ New GRN"</strong>. Type the Supplier name, BL/PO number, number of cartons/pallets, assigned Dock Bay (e.g. Bay 04), container seal number, and driver details.
                </li>
                <li>
                  <strong>Outward Cargo (Dispatching to client):</strong> Click <strong>"+ New GDN"</strong>. Fill in the Delivery Order number, customer destination (e.g. Al Quoz, Abu Dhabi), and vehicle plate.
                </li>
                <li>
                  <strong>Print Official Warehouse Slip:</strong> Click the <strong>Eye (View)</strong> icon on any record. It opens an official document with barcode, Dubai VAT TRN header, and signature lines. Click <strong>"Print Slip"</strong> to print or save as PDF.
                </li>
                <li>
                  <strong>Instant WhatsApp Update:</strong> Click the <strong>"WhatsApp"</strong> button next to any shipment. It copies a formatted text update (with bold text, Bay number, and seal status) that you can paste directly into your client's WhatsApp chat!
                </li>
              </ol>
            </div>

            <button
              onClick={() => {
                onNavigateTab('warehouse');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center space-x-2"
            >
              <span>Go to Warehouse Assistant Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP CONTENT: ENGLISH COACH */}
        {activeStep === 'coach' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                <Mic className="w-4 h-4" />
                <span>How to use the English Coach (with Tanglish)</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                <li>
                  <strong>Tab 1 - Real Dubai Scenarios:</strong> Select a scenario (e.g. <em>"Explaining Vessel Delay"</em> or <em>"Explaining Chargeable Weight vs Gross Weight"</em>).
                  <ul className="list-disc list-inside ml-4 mt-1 text-slate-400 space-y-1">
                    <li>Read the <strong>Tanglish Explanation</strong> to understand the psychological tricks and what words to avoid.</li>
                    <li>Click <strong>"Listen to Pronunciation"</strong> to hear the exact sentence spoken aloud in clear professional English!</li>
                    <li>Toggle <strong>"0.8x (Slow Practice)"</strong> at the top if you want to practice along at a relaxed pace.</li>
                  </ul>
                </li>
                <li>
                  <strong>Tab 2 - Ask the Coach:</strong> Have a specific situation at work? Type in Tanglish (e.g. <em>"Epdi client kitta detention charges pay panna sollanum?"</em>) or English. The coach generates the professional English script and explains it in friendly Tanglish!
                </li>
                <li>
                  <strong>Tab 3 - Tanglish Glossary:</strong> Quick audio-enabled dictionary for tricky logistics words like <em>Demurrage, Detention, Delivery Order (DO), Mirsal 2,</em> and <em>Bill of Entry</em>.
                </li>
              </ol>
            </div>

            <button
              onClick={() => {
                onNavigateTab('coach');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center space-x-2"
            >
              <span>Go to English Coach Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer info: Mobile / Desktop tip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Tip: Bookmark this page on your phone's browser for quick use inside the warehouse!</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
