import React from 'react';
import { FlaskConical, Sparkles, Compass, ListFilter, Award, RotateCcw } from 'lucide-react';
import { StepKey } from '../types';

interface HeaderProps {
  currentStep: StepKey;
  setCurrentStep: (step: StepKey) => void;
  onReset: () => void;
  onSelectPreset: (presetName: string) => void;
  totalCareersCount: number;
  hasMatches: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  setCurrentStep,
  onReset,
  onSelectPreset,
  totalCareersCount,
  hasMatches,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#CBD5E1] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentStep('subjects')}
            id="chempath-logo-button"
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0F172A] text-white shadow-xs group-hover:bg-[#1E293B] transition-colors border border-[#0F172A]">
              <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8] group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] font-sans">
                  ChemPath <span className="font-light text-[#0284C7]">Finder</span>
                </h1>
                <span className="text-[10px] font-mono font-bold py-0.5 px-2 bg-[#F8FAFC] text-[#0284C7] border border-[#BAE6FD] rounded">
                  {totalCareersCount} CAREERS
                </span>
              </div>
              <p className="text-xs text-[#64748B] hidden sm:block">
                Analytical chemistry pathway synthesis & career matching
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              id="nav-matcher-btn"
              onClick={() => setCurrentStep('subjects')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-mono font-bold tracking-wide transition-all cursor-pointer ${
                currentStep === 'subjects' || currentStep === 'interests' || currentStep === 'hobbies' || currentStep === 'environment' || currentStep === 'narrowing'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#38BDF8]" />
              <span>Career Matcher</span>
            </button>

            <button
              id="nav-top5-btn"
              onClick={() => setCurrentStep('top5')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-mono font-bold tracking-wide transition-all relative cursor-pointer ${
                currentStep === 'top5'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
              }`}
            >
              <Award className="w-4 h-4 text-[#38BDF8]" />
              <span>Top 5 Spotlight</span>
              {hasMatches && (
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              )}
            </button>

            {/* Prominently Highlighted 80 Careers Atlas Tab */}
            <button
              id="nav-atlas-btn"
              onClick={() => setCurrentStep('explorer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-mono font-bold tracking-wide transition-all cursor-pointer relative ${
                currentStep === 'explorer'
                  ? 'bg-[#0284C7] text-white border-2 border-[#0284C7] shadow-md ring-2 ring-[#38BDF8]/40'
                  : 'bg-[#F0F9FF] text-[#0369A1] hover:bg-[#E0F2FE] hover:text-[#0C4A6E] border-2 border-[#38BDF8] shadow-xs'
              }`}
            >
              <ListFilter className={`w-4 h-4 ${currentStep === 'explorer' ? 'text-white' : 'text-[#0284C7]'}`} />
              <span className="font-extrabold tracking-tight">80 Careers Atlas</span>
              <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-full ${
                currentStep === 'explorer'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#0284C7] text-white'
              }`}>
                ALL 80
              </span>
            </button>

            <button
              id="reset-matcher-btn"
              onClick={onReset}
              title="Reset all selections"
              className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer border border-[#E2E8F0] hover:border-[#CBD5E1]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </nav>
        </div>

        {/* Quick Presets Bar */}
        <div className="py-2.5 border-t border-[#E2E8F0] flex items-center justify-between overflow-x-auto no-scrollbar text-xs gap-3">
          <div className="flex items-center gap-1.5 text-[#64748B] whitespace-nowrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#64748B]">Sample Personas:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'biomed', label: 'Bio-Pharma & Medicine' },
              { id: 'climate', label: 'Clean Energy & Climate' },
              { id: 'forensics', label: 'Crime Lab & Forensics' },
              { id: 'tech', label: 'AI & Quantum Tech' },
              { id: 'cosmetics', label: 'Cosmetics & Formulation' },
              { id: 'law', label: 'Patent Law & Policy' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p.id)}
                className="px-2.5 py-1 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] hover:text-[#0F172A] text-xs font-mono font-medium rounded-md border border-[#CBD5E1] whitespace-nowrap transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
