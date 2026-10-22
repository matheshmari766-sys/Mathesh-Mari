import React from 'react';
import { 
  Calculator, 
  Mail, 
  PackageCheck, 
  Mic, 
  HelpCircle, 
  ShieldCheck, 
  Compass, 
  Anchor,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'cbm' | 'email' | 'warehouse' | 'coach';
  setActiveTab: (tab: 'cbm' | 'email' | 'warehouse' | 'coach') => void;
  onOpenCostModal: () => void;
  onOpenHowToUseModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenCostModal,
  onOpenHowToUseModal 
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('cbm')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
              <Anchor className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">LogiMate</span>
                <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                  Dubai AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Account Leader Logistics Suite • Jebel Ali & DWC
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('cbm')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'cbm'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden md:inline">CBM Calculator</span>
              <span className="md:hidden">CBM</span>
              <span className="ml-1 text-[10px] uppercase font-bold px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hidden lg:inline">
                Offline
              </span>
            </button>

            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'email'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden md:inline">Email Writer</span>
              <span className="md:hidden">Email</span>
            </button>

            <button
              onClick={() => setActiveTab('warehouse')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'warehouse'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span className="hidden md:inline">GRN / GDN Assistant</span>
              <span className="md:hidden">Warehouse</span>
            </button>

            <button
              onClick={() => setActiveTab('coach')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'coach'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span className="hidden md:inline">English Coach (Tanglish)</span>
              <span className="md:hidden">Coach</span>
            </button>
          </nav>

          {/* Right Action: Free Plan / Info & Dubai Time */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenHowToUseModal}
              className="flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-sm"
              title="Click for step-by-step instructions"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>How to Use</span>
            </button>

            <button
              onClick={onOpenCostModal}
              className="hidden sm:flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 transition-colors"
              title="Click to view Free Plan details"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Free</span>
              <HelpCircle className="w-3 h-3 text-emerald-400" />
            </button>

            <div className="hidden xl:flex items-center space-x-1 text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>GST (Dubai UTC+4)</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
