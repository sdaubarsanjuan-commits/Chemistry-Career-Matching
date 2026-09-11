import React from 'react';
import { ArrowRight, ArrowLeft, Building2, Sparkles, FlaskConical, Check, Gauge, Layers, Atom, Heart, Zap } from 'lucide-react';
import { StudentProfile } from '../types';

interface WizardStepEnvironmentProps {
  profile: StudentProfile;
  onUpdateProfile: (updates: Partial<StudentProfile>) => void;
  onPrev: () => void;
  onCalculate: () => void;
  filteredCount: number;
}

export const WizardStepEnvironment: React.FC<WizardStepEnvironmentProps> = ({
  profile,
  onUpdateProfile,
  onPrev,
  onCalculate,
}) => {
  const workEnvironments = [
    { 
      id: 'Any / No Preference', 
      label: 'Flexible / Any Matrix Setting', 
      desc: 'Open to wet bench, computational desk, or field environments',
      specTag: 'All Matrix Configurations'
    },
    { 
      id: 'Bench Lab', 
      label: 'Wet Chemical Bench & Fume Hoods', 
      desc: 'Synthesis glassware, HPLC chromatography, spectroscopy, titrations, and pipetting',
      specTag: 'Wet Lab / Analytical'
    },
    { 
      id: 'Computational/Desk', 
      label: 'Computational & Molecular Simulation', 
      desc: 'Quantum modeling software, high-throughput data pipelines, and AI drug screeners',
      specTag: 'In Silico / Modeling'
    },
    { 
      id: 'Field & Outdoors', 
      label: 'Field Sampling & Geochemical Stations', 
      desc: 'Oceanographic research vessels, volcanic sites, polar glaciers, and agricultural ecosystems',
      specTag: 'In Situ / Environmental'
    },
    { 
      id: 'Hospital/Clinical', 
      label: 'Hospital Diagnostics & Clinical Suites', 
      desc: 'Blood biomarker analyzers, clinical toxicology instruments, and diagnostic patient care',
      specTag: 'Medical Pathology'
    },
    { 
      id: 'Industrial Plant', 
      label: 'Pilot Reactors & Chemical Manufacturing', 
      desc: 'Continuous flow reactors, scale-up tanks, ISO cleanrooms, and automated QA systems',
      specTag: 'Pilot Plant / QA-QC'
    },
    { 
      id: 'Classroom/Courtroom/Office', 
      label: 'Patent Law, Policy & Academic Chambers', 
      desc: 'Intellectual property law firms, EPA regulatory agencies, and university lecture halls',
      specTag: 'Regulatory & Academic'
    },
  ];

  const gradeLevels: StudentProfile['gradeLevel'][] = [
    'Middle School',
    'High School (9-10)',
    'High School (11-12)',
    'Undergraduate',
    'Career Explorer',
  ];

  return (
    <div className="space-y-6">
      {/* Synthesis Reaction Pipeline Header */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Reaction Phase Tracker */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-mono font-semibold uppercase">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F172A] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            Phase 4: Lab Setting
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0284C7] font-bold mb-1.5">
              <Gauge className="w-4 h-4 text-[#0284C7]" />
              <span>Laboratory Matrix & Operating Environment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Where do you envision doing your best work?
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2">
              Every chemical discipline operates within a distinct physical environment—from wet synthesis fume hoods and cleanrooms to high-performance supercomputing desks and remote field stations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="env-back-btn"
              onClick={onPrev}
              className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] text-xs font-mono font-bold uppercase tracking-wider border border-[#CBD5E1] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Phase 3</span>
            </button>
            <button
              id="calculate-top5-btn"
              onClick={onCalculate}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer transition-all border border-[#0F172A]"
            >
              <FlaskConical className="w-4 h-4 text-[#38BDF8]" />
              <span>Distill Top 5 Matches</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Work Environment Selector (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#CBD5E1] rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-base">
              <Building2 className="w-5 h-5 text-[#0284C7]" />
              <h3>Laboratory & Workplace Setting</h3>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] uppercase">Physical Matrix</span>
          </div>

          <p className="text-xs text-[#64748B]">
            Select the daily environment where you feel most energized and productive:
          </p>

          <div className="space-y-2.5">
            {workEnvironments.map((env) => {
              const isSelected = profile.workEnvPreference === env.id;
              return (
                <div
                  key={env.id}
                  id={`work-env-${env.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  onClick={() => onUpdateProfile({ workEnvPreference: env.id })}
                  className={`p-3.5 rounded-lg cursor-pointer transition-all border flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white border-[#0284C7] ring-2 ring-[#0284C7]/20 shadow-xs'
                      : 'bg-white hover:bg-[#F8FAFC] border-[#E2E8F0]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#0F172A]">
                        {env.label}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#F1F5F9] text-[#475569] rounded border border-[#E2E8F0] shrink-0">
                        {env.specTag}
                      </span>
                    </div>
                    <span className="text-xs text-[#64748B] block mt-0.5 leading-relaxed">
                      {env.desc}
                    </span>
                  </div>

                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                    isSelected ? 'bg-[#0284C7] border-[#0284C7] text-white' : 'border-[#CBD5E1] bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Synthesis Profile Summary & Academic Level (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reaction Profile Synthesis Card */}
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <div className="flex items-center gap-2 text-[#0F172A] font-bold text-base">
                <Layers className="w-5 h-5 text-[#0284C7]" />
                <h3>Reaction Reagents Selected</h3>
              </div>
              <span className="text-[10px] font-mono text-[#64748B] uppercase">Distillation Feedstock</span>
            </div>

            {/* Disciplines */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0284C7]">
                <Atom className="w-3.5 h-3.5" />
                <span>Academic Disciplines ({profile.selectedSubjects.length})</span>
              </div>
              {profile.selectedSubjects.length === 0 ? (
                <p className="text-xs text-[#94A3B8] italic">No disciplines chosen (all 80 open)</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.selectedSubjects.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E0F2FE] text-[#0369A1] font-semibold border border-[#BAE6FD]">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Passions */}
            <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#D97706]">
                <Zap className="w-3.5 h-3.5" />
                <span>Catalytic Passions ({profile.selectedInterests.length})</span>
              </div>
              {profile.selectedInterests.length === 0 ? (
                <p className="text-xs text-[#94A3B8] italic">No passions chosen (all 80 open)</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.selectedInterests.map((i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FEF3C7] text-[#92400E] font-semibold border border-[#FDE68A]">
                      {i}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Hobbies */}
            <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#DB2777]">
                <Heart className="w-3.5 h-3.5" />
                <span>Hobbies & Crafts ({profile.selectedHobbies.length})</span>
              </div>
              {profile.selectedHobbies.length === 0 ? (
                <p className="text-xs text-[#94A3B8] italic">No hobbies chosen (optional)</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.selectedHobbies.map((h) => (
                    <span key={h} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FCE7F3] text-[#9D174D] font-semibold border border-[#FBCFE8]">
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Student Status */}
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 space-y-3 shadow-xs">
            <h4 className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-widest">
              Current Academic Status
            </h4>
            <div className="flex flex-wrap gap-2">
              {gradeLevels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onUpdateProfile({ gradeLevel: lvl })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wide transition-all cursor-pointer ${
                    profile.gradeLevel === lvl
                      ? 'bg-[#0F172A] text-white border border-[#0F172A] shadow-xs'
                      : 'bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Distillation Launch Banner */}
      <div className="p-6 bg-white border border-[#CBD5E1] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#0F172A] font-bold text-sm font-mono">
            <FlaskConical className="w-4 h-4 text-[#0284C7]" />
            <span>Ready for Fractional Distillation into Top 5 Careers</span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            We will cross-reference your {profile.selectedSubjects.length} academic disciplines, {profile.selectedInterests.length} catalyst vectors, and {profile.selectedHobbies.length} hobbies against all 80 chemistry specializations.
          </p>
        </div>

        <button
          id="reveal-top5-large-btn"
          onClick={onCalculate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer border border-[#0F172A]"
        >
          <Sparkles className="w-4 h-4 text-[#38BDF8]" />
          <span>Launch Fractional Distillation (Top 5)</span>
          <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
        </button>
      </div>
    </div>
  );
};
