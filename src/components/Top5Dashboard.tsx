import React, { useState } from 'react';
import { MatchResult } from '../utils/matcher';
import { Career, StudentProfile } from '../types';
import { 
  Award, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Printer, 
  ChevronRight,
  ArrowLeft,
  Layers,
  Atom,
  Clock,
  ExternalLink
} from 'lucide-react';
import { AiCareerAdvisor } from './AiCareerAdvisor';

interface Top5DashboardProps {
  top5Careers: Career[];
  matchResults: MatchResult[];
  profile: StudentProfile;
  onOpenCareer: (career: Career) => void;
  onBackToFunnel: () => void;
}

export const Top5Dashboard: React.FC<Top5DashboardProps> = ({
  top5Careers,
  matchResults,
  profile,
  onOpenCareer,
  onBackToFunnel,
}) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'matrix' | 'roadmap' | 'advisor'>('cards');

  const printRoadmap = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle Watermark Reaction Ring */}
        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none text-[#0F172A]">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" />
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0284C7] mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0284C7]" />
              <span>Fractional Distillation Output • 5 Primary Pathways</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Your Top 5 Chemistry Pathways
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-2 max-w-2xl leading-relaxed">
              Synthesized from our database of 80 chemistry specializations. These five careers uniquely integrate your academic disciplines ({profile.selectedSubjects.join(', ') || 'All Disciplines'}), real-world passions ({profile.selectedInterests.join(', ') || 'All Interests'}), and personal hobbies ({profile.selectedHobbies.join(', ') || 'General Exploration'}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onBackToFunnel}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] text-xs font-mono font-bold uppercase tracking-wider border border-[#CBD5E1] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Pipeline Funnel</span>
            </button>
            <button
              onClick={printRoadmap}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer border border-[#0F172A]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'cards', label: 'Top 5 Spotlight Cards', icon: Award },
            { id: 'matrix', label: 'Side-by-Side Comparison Matrix', icon: Briefcase },
            { id: 'roadmap', label: 'Academic & High School Roadmap', icon: GraduationCap },
            { id: 'advisor', label: 'AI Chemistry Career Advisor', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-xs border border-[#0F172A]'
                    : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* View 1: Spotlight Cards */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {top5Careers.map((career, index) => {
              const match = matchResults.find((m) => m.career.id === career.id);
              const score = match ? match.score : 85;
              return (
                <div
                  key={career.id}
                  id={`top5-card-${career.id}`}
                  className="bg-white border border-[#CBD5E1] border-l-4 border-l-[#0284C7] rounded-xl p-5 relative flex flex-col justify-between group transition-all shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                          #{index + 1}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                            {career.category}
                          </span>
                          <h3 
                            onClick={() => onOpenCareer(career)}
                            className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] cursor-pointer transition-colors leading-snug"
                          >
                            {career.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-mono font-bold shrink-0">
                        <Sparkles className="w-3 h-3 text-[#22C55E]" />
                        <span>{score}%</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#0284C7] font-mono italic mb-2.5 line-clamp-1">
                      "{career.tagline}"
                    </p>

                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-3.5">
                      {career.description}
                    </p>

                    {/* Real world chemistry impact callout */}
                    {career.chemistryImpact && (
                      <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] mb-3.5 leading-relaxed">
                        <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-[#0284C7] uppercase mb-0.5">
                          <Atom className="w-3 h-3" />
                          <span>Real-World Chemistry:</span>
                        </div>
                        <span className="line-clamp-2">{career.chemistryImpact}</span>
                      </div>
                    )}

                    {/* Key Attributes Bento */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#F1F5F9]">
                      <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                        <span className="text-[9px] text-[#64748B] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                          <Layers className="w-2.5 h-2.5 text-[#0284C7]" />
                          Subfield
                        </span>
                        <span className="text-xs font-bold text-[#0F172A] block mt-0.5 truncate" title={career.chemistrySubfield}>
                          {career.chemistrySubfield}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                        <span className="text-[9px] text-[#64748B] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                          <Briefcase className="w-2.5 h-2.5 text-[#0284C7]" />
                          Environment
                        </span>
                        <span className="text-xs font-bold text-[#0F172A] block mt-0.5 truncate" title={career.workEnvironment}>
                          {career.workEnvironment}
                        </span>
                      </div>
                    </div>

                    {/* High School Tips Preview */}
                    <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
                      <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block mb-1.5">
                        Key Preparation Step:
                      </span>
                      <div className="text-xs text-[#334155] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{career.highSchoolTips[0] || 'Take advanced chemistry and biology coursework.'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#64748B] truncate max-w-[140px]" title={career.sampleEmployers.join(', ')}>
                      {career.sampleEmployers[0] || 'Top Research Labs'}
                    </span>

                    <button
                      onClick={() => onOpenCareer(career)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-mono font-bold tracking-wide transition-all flex items-center gap-1 cursor-pointer shadow-xs border border-[#0F172A]"
                    >
                      <span>Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Side-by-Side Comparison Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 overflow-x-auto shadow-xs">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#0F172A]">
              Side-by-Side Career Evaluation Matrix (Top 5)
            </h3>
            <p className="text-xs text-[#64748B]">
              Compare chemistry subfields, educational timelines, daily environments, and core laboratory competencies across all five recommendations.
            </p>
          </div>

          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b-2 border-[#CBD5E1]">
                <th className="p-3 text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider w-[16%]">Attribute</th>
                {top5Careers.map((c, idx) => (
                  <th key={c.id} className="p-3 text-xs font-bold text-[#0F172A] w-[16.8%]">
                    <div className="flex items-center gap-1 text-[#0284C7] text-xs font-mono font-bold mb-1">
                      #{idx + 1}
                    </div>
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs text-[#334155]">
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Chemistry Subfield</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3">
                    <span className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                      {c.chemistrySubfield}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Category</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3 font-medium">{c.category}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Education Pathway</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3 leading-relaxed">{c.educationLevel}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Work Setting</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3 leading-relaxed">{c.workEnvironment}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Key Lab Skills</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3">
                    <ul className="space-y-1">
                      {c.topSkills.map((s, i) => (
                        <li key={i} className="text-[11px] text-[#475569] flex items-center gap-1 font-mono">
                          <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Day in the Life</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3 leading-relaxed text-[#64748B] text-[11px]">
                    {c.dayInTheLife}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Sample Employers</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3">
                    <span className="text-[11px] font-semibold text-[#0F172A] block">
                      {c.sampleEmployers.join(', ')}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[#0F172A] bg-[#F8FAFC]">Deep Dive</td>
                {top5Careers.map((c) => (
                  <td key={c.id} className="p-3">
                    <button
                      onClick={() => onOpenCareer(c)}
                      className="px-3 py-1 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white text-[11px] font-mono font-bold transition-colors cursor-pointer"
                    >
                      Open Dossier
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* View 3: Academic Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs">
            <h3 className="text-lg font-bold text-[#0F172A] mb-1">
              Academic & High School Action Plan (Top 5 Careers)
            </h3>
            <p className="text-xs text-[#64748B]">
              Follow this step-by-step preparation timeline from high school through university and laboratory internships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {top5Careers.map((career, idx) => (
              <div key={career.id} className="bg-white border border-[#CBD5E1] rounded-xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#0F172A] text-white text-xs font-mono font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-[#0F172A]">{career.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded border border-[#BAE6FD]">
                    {career.chemistrySubfield}
                  </span>
                </div>

                {/* High school action items */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block">
                    High School Recommendations:
                  </span>
                  <ul className="space-y-2">
                    {career.highSchoolTips.map((tip, i) => (
                      <li key={i} className="text-xs text-[#334155] flex items-start gap-2 bg-[#F8FAFC] p-2 rounded border border-[#E2E8F0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* College majors */}
                <div className="pt-2 border-t border-[#F1F5F9]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Recommended College Majors:
                  </span>
                  <p className="text-xs font-semibold text-[#0F172A]">
                    {career.recommendedCollegeMajor}
                  </p>
                </div>

                {/* Education Timeline */}
                <div className="pt-2 border-t border-[#F1F5F9]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Degree Requirement:
                  </span>
                  <p className="text-xs text-[#475569]">
                    {career.educationLevel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 4: AI Career Advisor */}
      {activeTab === 'advisor' && (
        <AiCareerAdvisor
          topCareers={top5Careers}
          profile={profile}
          onOpenCareer={onOpenCareer}
        />
      )}
    </div>
  );
};
