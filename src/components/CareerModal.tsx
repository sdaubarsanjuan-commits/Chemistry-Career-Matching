import React from 'react';
import { Career } from '../types';
import { 
  X, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Building2, 
  BookOpen, 
  FlaskConical, 
  Star,
  Atom,
  Layers
} from 'lucide-react';

interface CareerModalProps {
  career: Career | null;
  onClose: () => void;
  isPinnedInTop5: boolean;
  onTogglePinInTop5: (careerId: string) => void;
}

export const CareerModal: React.FC<CareerModalProps> = ({
  career,
  onClose,
  isPinnedInTop5,
  onTogglePinInTop5,
}) => {
  if (!career) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white border border-[#CBD5E1] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs shrink-0">
              #{career.number}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">
                  {career.category}
                </span>
                <span className="text-[#CBD5E1]">•</span>
                <span className="text-xs font-mono font-semibold text-[#0369A1] bg-[#E0F2FE] px-2 py-0.5 rounded border border-[#BAE6FD]">
                  {career.chemistrySubfield}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">
                {career.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onTogglePinInTop5(career.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                isPinnedInTop5
                  ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                  : 'bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isPinnedInTop5 ? 'fill-current text-[#D97706]' : ''}`} />
              <span>{isPinnedInTop5 ? 'Pinned in Top 5' : 'Pin in Top 5'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tagline Callout */}
          <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-sm text-[#0369A1] font-medium font-mono">
            "{career.tagline}"
          </div>

          {/* Core Overview */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Career Overview & Core Mission
            </h3>
            <p className="text-sm text-[#334155] leading-relaxed">
              {career.description}
            </p>
          </div>

          {/* Real World Impact */}
          {career.chemistryImpact && (
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-sm text-[#166534] leading-relaxed">
              <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase text-[#15803D] mb-1">
                <Atom className="w-4 h-4 text-[#16A34A]" />
                <span>Real-World Chemistry Impact</span>
              </div>
              <p>{career.chemistryImpact}</p>
            </div>
          )}

          {/* Attributes Matrix Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#0284C7]" />
                Education Required
              </span>
              <span className="text-sm font-bold text-[#0F172A] block">
                {career.educationLevel}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
                Work Environment
              </span>
              <span className="text-sm font-bold text-[#0F172A] block">
                {career.workEnvironment}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#0284C7]" />
                Recommended College Major
              </span>
              <span className="text-sm font-bold text-[#0F172A] block">
                {career.recommendedCollegeMajor}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
                Chemistry Subfield
              </span>
              <span className="text-sm font-bold text-[#0F172A] block">
                {career.chemistrySubfield}
              </span>
            </div>
          </div>

          {/* Day in the Life */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
              A Typical Day on the Job
            </h3>
            <p className="text-sm text-[#334155] leading-relaxed bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
              {career.dayInTheLife}
            </p>
          </div>

          {/* Top Skills */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2.5">
              Essential Skills & Lab Proficiencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.topSkills.map((skill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* High School Tips */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2.5">
              High School & Early Prep Checklist
            </h3>
            <ul className="space-y-2">
              {career.highSchoolTips.map((tip, i) => (
                <li key={i} className="text-xs text-[#334155] flex items-start gap-2.5 bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Employers */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Typical Employers & Research Institutions
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.sampleEmployers.map((emp, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] flex items-center gap-1.5"
                >
                  <Building2 className="w-3 h-3 text-[#0284C7]" />
                  <span>{emp}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] p-4 sm:p-5 flex items-center justify-between gap-4">
          <button
            onClick={() => onTogglePinInTop5(career.id)}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPinnedInTop5
                ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isPinnedInTop5 ? 'fill-current text-[#D97706]' : ''}`} />
            <span>{isPinnedInTop5 ? 'Remove from Top 5' : 'Add to Top 5'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-mono font-bold transition-colors cursor-pointer border border-[#0F172A]"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
