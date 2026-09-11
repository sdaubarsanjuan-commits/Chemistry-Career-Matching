import React from 'react';
import { ArrowRight, FlaskConical, Atom, Sparkles, Check, Beaker } from 'lucide-react';
import { SUBJECT_OPTIONS } from '../data/subjectsAndInterests';
import { IconHelper } from './IconHelper';

interface WizardStepSubjectsProps {
  selectedSubjects: string[];
  onToggleSubject: (subjectId: string) => void;
  onNext: () => void;
  filteredCount: number;
}

export const WizardStepSubjects: React.FC<WizardStepSubjectsProps> = ({
  selectedSubjects,
  onToggleSubject,
  onNext,
  filteredCount,
}) => {
  return (
    <div className="space-y-6">
      {/* Synthesis Reaction Pipeline Header */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle Watermark Hexagonal Bond Ring */}
        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none text-[#0F172A]">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" />
          </svg>
        </div>

        {/* Reaction Phase Tracker */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F172A] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
            <FlaskConical className="w-3.5 h-3.5 text-[#38BDF8]" />
            Phase 1: Academic Reagents
          </span>
          <span className="text-[#94A3B8] text-xs font-mono">→</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-mono font-semibold uppercase">
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
              <Atom className="w-4 h-4 animate-spin-slow" />
              <span>Discipline Substrate Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Which academic disciplines fuel your curiosity?
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2">
              Chemistry is the central molecular science. By combining chemistry with disciplines like computing, biology, physics, or law, you open distinct professional pathways. Select your favorite subjects to synthesize matching careers.
            </p>
          </div>

          {/* Reaction Distillation Counter & Action */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E2E8F0]">
            <div className="text-left lg:text-right bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg min-w-[140px]">
              <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block flex items-center gap-1 justify-start lg:justify-end">
                <Beaker className="w-3 h-3 text-[#0284C7]" />
                Viable Pathways
              </span>
              <div className="flex items-baseline gap-1 justify-start lg:justify-end mt-0.5">
                <span className="text-2xl font-bold font-mono text-[#0F172A]">
                  {String(filteredCount).padStart(2, '0')}
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">/ 80</span>
              </div>
            </div>

            <button
              id="subjects-continue-btn"
              onClick={onNext}
              disabled={selectedSubjects.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono ${
                selectedSubjects.length > 0
                  ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm border border-[#0F172A]'
                  : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
              }`}
            >
              <span>Catalyze Phase 2</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>
        </div>

        {/* Selected Reagent Chips */}
        <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
            Active Reagents ({selectedSubjects.length}):
          </span>
          {selectedSubjects.length === 0 ? (
            <span className="text-xs text-[#94A3B8] italic font-sans">
              Select 1 to 3 subjects below to begin chemical career alignment
            </span>
          ) : (
            selectedSubjects.map((s) => {
              const item = SUBJECT_OPTIONS.find((sub) => sub.id === s);
              return (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-semibold text-[#0369A1] font-mono"
                >
                  <span className="text-[10px] font-bold px-1 py-0.2 bg-[#E0F2FE] rounded text-[#0284C7]">
                    {item?.elementSymbol || 'Rx'}
                  </span>
                  <span>{s}</span>
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Grid of Periodic Table Element-style Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SUBJECT_OPTIONS.map((subject) => {
          const isSelected = selectedSubjects.includes(subject.id);
          return (
            <div
              key={subject.id}
              id={`subject-card-${subject.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onToggleSubject(subject.id)}
              className={`p-4 sm:p-5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'bg-white border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-md'
                  : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm'
              }`}
            >
              {/* Element Header Block */}
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#F1F5F9]">
                  {/* Periodic Element Symbol Box */}
                  <div className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center border font-mono transition-colors ${
                    isSelected 
                      ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-xs' 
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] group-hover:border-[#CBD5E1]'
                  }`}>
                    <span className="text-[9px] font-medium leading-none text-[#94A3B8]">
                      {String(subject.atomicNumber || 0).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold leading-tight tracking-tight">
                      {subject.elementSymbol}
                    </span>
                  </div>

                  {/* Formula Tag */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0] block">
                      {subject.chemicalFormula}
                    </span>
                  </div>

                  {/* Selected Indicator Checkmark */}
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#0284C7] border-[#0284C7] text-white'
                      : 'border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]'
                  }`}>
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : null}
                  </div>
                </div>

                {/* Subject Title & Description */}
                <div className="mt-3.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${
                      isSelected ? 'bg-[#E0F2FE] text-[#0284C7]' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}>
                      <IconHelper name={subject.iconName} className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                      {subject.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed mt-2 line-clamp-2">
                    {subject.description}
                  </p>
                </div>
              </div>

              {/* Chemistry Bridge Tag */}
              <div className="mt-4 pt-2.5 border-t border-[#F1F5F9]">
                <div className="text-[10px] font-mono text-[#0284C7] font-semibold flex items-center gap-1 truncate" title={subject.chemistryBridge}>
                  <Sparkles className="w-2.5 h-2.5 shrink-0 text-[#0284C7]" />
                  <span className="truncate">{subject.chemistryBridge}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Synthesis Prompt Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white border border-[#CBD5E1] rounded-xl gap-4 shadow-xs">
        <div className="flex items-center gap-3 text-xs text-[#475569]">
          <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4 text-[#0284C7]" />
          </div>
          <div>
            <span className="font-bold text-[#0F172A] block font-mono text-[11px] uppercase tracking-wide">
              Chemical Synergies
            </span>
            <span>Combining 2 or 3 disciplines yields higher precision across our 80 specialized career tracks.</span>
          </div>
        </div>

        <button
          id="subjects-bottom-next-btn"
          onClick={onNext}
          disabled={selectedSubjects.length === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono whitespace-nowrap ${
            selectedSubjects.length > 0
              ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm'
              : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
          }`}
        >
          <span>Next: Select Reaction Catalysts</span>
          <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
        </button>
      </div>
    </div>
  );
};


