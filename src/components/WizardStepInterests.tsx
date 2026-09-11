import React from 'react';
import { ArrowRight, ArrowLeft, Zap, Sparkles, Check, Flame, Atom } from 'lucide-react';
import { INTEREST_OPTIONS } from '../data/subjectsAndInterests';
import { IconHelper } from './IconHelper';

interface WizardStepInterestsProps {
  selectedInterests: string[];
  onToggleInterest: (interestId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  filteredCount: number;
}

export const WizardStepInterests: React.FC<WizardStepInterestsProps> = ({
  selectedInterests,
  onToggleInterest,
  onPrev,
  onNext,
  filteredCount,
}) => {
  // Group interests by category for intuitive exploration
  const categories = Array.from(new Set(INTEREST_OPTIONS.map((item) => item.category)));

  return (
    <div className="space-y-6">
      {/* Synthesis Reaction Pipeline Header */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle Watermark Orbital */}
        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none text-[#0F172A]">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
            <ellipse cx="50" cy="50" rx="42" ry="18" stroke="currentColor" strokeWidth="3" fill="none" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="18" stroke="currentColor" strokeWidth="3" fill="none" transform="rotate(-30 50 50)" />
          </svg>
        </div>

        {/* Reaction Phase Tracker */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-mono font-semibold uppercase">
            Phase 1: Academic Reagents
          </span>
          <span className="text-[#94A3B8] text-xs font-mono">→</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F172A] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            Phase 2: Reaction Catalysts
          </span>
          <span className="text-[#94A3B8] text-xs font-mono">→</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-mono font-semibold uppercase">
            Phase 3: Hobbies & Crafts
          </span>
          <span className="text-[#94A3B8] text-xs font-mono">→</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-mono font-semibold uppercase">
            Phase 4: Lab Setting
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7] font-bold mb-1.5">
              <Flame className="w-4 h-4 text-[#F59E0B]" />
              <span>Applied Impact & Catalytic Vectors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Which real-world challenges ignite your passion?
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2">
              Chemistry is the driving engine behind pharmaceuticals, semiconductor chips, renewable energy grids, and forensic criminology. Select the industries and scientific challenges you are most eager to transform.
            </p>
          </div>

          {/* Quick Counter Badge & Action */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
            <div className="text-left lg:text-right bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg min-w-[140px]">
              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                Target Matches
              </span>
              <div className="flex items-baseline gap-1 justify-start lg:justify-end mt-0.5">
                <span className="text-2xl font-bold font-mono text-[#0F172A]">
                  {String(filteredCount).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">/ 80</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="interests-back-btn"
                onClick={onPrev}
                className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] text-xs font-mono font-bold uppercase tracking-wider border border-[#CBD5E1] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Phase 1</span>
              </button>
              <button
                id="interests-continue-btn"
                onClick={onNext}
                disabled={selectedInterests.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono ${
                  selectedInterests.length > 0
                    ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm border border-[#0F172A]'
                    : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
                }`}
              >
                <span>Continue to Hobbies</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Catalysts Summary */}
        <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
            Activated Catalysts ({selectedInterests.length}):
          </span>
          {selectedInterests.length === 0 ? (
            <span className="text-xs text-[#94A3B8] italic font-sans">
              Select 1 to 3 challenge vectors below
            </span>
          ) : (
            selectedInterests.map((interest) => {
              const item = INTEREST_OPTIONS.find((i) => i.id === interest);
              return (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FEF3C7] border border-[#FDE68A] text-xs font-semibold text-[#92400E] font-mono"
                >
                  <span className="text-[10px] font-bold px-1 py-0.2 bg-[#FDE68A] rounded text-[#78350F]">
                    {item?.catalystCode?.replace('CAT-', '') || 'CAT'}
                  </span>
                  <span>{interest}</span>
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Categorized Catalyst Cards */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryInterests = INTEREST_OPTIONS.filter((i) => i.category === category);
          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
                <h3 className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#0284C7] rounded-xs" />
                  <span>Domain Vector: {category}</span>
                </h3>
                <span className="text-[10px] font-mono text-[#64748B] uppercase">
                  {categoryInterests.length} Catalytic Areas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryInterests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <div
                      key={interest.id}
                      id={`interest-card-${interest.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      onClick={() => onToggleInterest(interest.id)}
                      className={`p-5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between group relative overflow-hidden ${
                        isSelected
                          ? 'bg-white border-[#D97706] ring-2 ring-[#D97706]/20 shadow-md'
                          : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#F1F5F9]">
                          <div className={`p-2 rounded-lg transition-colors ${
                            isSelected ? 'bg-[#FEF3C7] text-[#B45309]' : 'bg-[#F8FAFC] text-[#64748B] group-hover:text-[#0F172A]'
                          }`}>
                            <IconHelper name={interest.iconName} className="w-5 h-5" />
                          </div>

                          {/* Catalyst Code Badge */}
                          <span className="text-[10px] font-mono text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                            {interest.catalystCode || 'CAT-00'}
                          </span>

                          {/* Checkbox */}
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#D97706] border-[#D97706] text-white'
                              : 'border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]'
                          }`}>
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-3.5">
                          <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#B45309] transition-colors">
                            {interest.name}
                          </h4>
                          <p className="text-xs text-[#64748B] leading-relaxed mt-2 line-clamp-2">
                            {interest.description}
                          </p>
                        </div>
                      </div>

                      {/* Chemical Mechanism Tag */}
                      <div className="mt-4 pt-2.5 border-t border-[#F1F5F9]">
                        <div className="text-[10px] font-mono text-[#B45309] font-medium flex items-center gap-1 truncate" title={interest.chemistryMechanism}>
                          <Atom className="w-2.5 h-2.5 shrink-0 text-[#D97706]" />
                          <span className="truncate">{interest.chemistryMechanism}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white border border-[#CBD5E1] rounded-xl gap-4 shadow-xs">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] text-xs font-mono font-bold uppercase tracking-wider border border-[#CBD5E1] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Disciplines</span>
        </button>

        <button
          id="interests-bottom-next-btn"
          onClick={onNext}
          disabled={selectedInterests.length === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono ${
            selectedInterests.length > 0
              ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm'
              : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
          }`}
        >
          <span>Next: Hobbies & Creative Pursuits</span>
          <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
        </button>
      </div>
    </div>
  );
};


