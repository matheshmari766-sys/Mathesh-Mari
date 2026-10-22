import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Mail, 
  PackageCheck, 
  Mic, 
  ShieldCheck, 
  Compass, 
  Anchor, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  HelpCircle,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CbmCalculator } from './components/CbmCalculator';
import { EmailWriter } from './components/EmailWriter';
import { WarehouseAssistant } from './components/WarehouseAssistant';
import { SpeakingCoach } from './components/SpeakingCoach';
import { CostTransparencyModal } from './components/CostTransparencyModal';
import { HowToUseModal } from './components/HowToUseModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cbm' | 'email' | 'warehouse' | 'coach'>('cbm');
  const [costModalOpen, setCostModalOpen] = useState(false);
  const [howToUseModalOpen, setHowToUseModalOpen] = useState(false);
  const [dubaiTime, setDubaiTime] = useState('');

  // Update Dubai GST Time (UTC+4)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setDubaiTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCostModal={() => setCostModalOpen(true)}
        onOpenHowToUseModal={() => setHowToUseModalOpen(true)}
      />

      {/* Account Leader Quick Header Strip */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Account Leader Workspace:</span>
            <span className="text-slate-400">Jebel Ali Port • DWC Air Cargo • JAFZA South • DIC Hub</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Dubai Time:</span>
              <span className="font-mono font-bold text-amber-400">{dubaiTime || '09:00:00 AM GST'}</span>
            </div>

            <button
              onClick={() => setCostModalOpen(true)}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
            >
              <span>Zero-Cost Status: Free Prototype</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main App Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab Content Rendering */}
        {activeTab === 'cbm' && <CbmCalculator />}
        {activeTab === 'email' && <EmailWriter />}
        {activeTab === 'warehouse' && <WarehouseAssistant />}
        {activeTab === 'coach' && <SpeakingCoach />}
      </main>

      {/* Quick Switch Footer Bar */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-auto py-5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
              LM
            </div>
            <span className="font-bold text-slate-200">LogiMate AI</span>
            <span>— Tailored for Dubai Freight & Logistics Account Leaders</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={() => setActiveTab('cbm')}
              className={`hover:text-amber-400 transition-colors ${activeTab === 'cbm' ? 'text-amber-400 font-bold' : ''}`}
            >
              1. CBM Calculator
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveTab('email')}
              className={`hover:text-amber-400 transition-colors ${activeTab === 'email' ? 'text-amber-400 font-bold' : ''}`}
            >
              2. Email Writer
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveTab('warehouse')}
              className={`hover:text-amber-400 transition-colors ${activeTab === 'warehouse' ? 'text-amber-400 font-bold' : ''}`}
            >
              3. GRN / GDN Assistant
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setActiveTab('coach')}
              className={`hover:text-amber-400 transition-colors ${activeTab === 'coach' ? 'text-amber-400 font-bold' : ''}`}
            >
              4. English Coach (Tanglish)
            </button>
          </div>

          <div>
            <button
              onClick={() => setCostModalOpen(true)}
              className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center space-x-1"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Are any features paid?</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Cost & Free Plan Transparency Modal */}
      <CostTransparencyModal
        isOpen={costModalOpen}
        onClose={() => setCostModalOpen(false)}
      />

      {/* Interactive How To Use Guide Modal */}
      <HowToUseModal
        isOpen={howToUseModalOpen}
        onClose={() => setHowToUseModalOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setHowToUseModalOpen(false);
        }}
      />
    </div>
  );
}
