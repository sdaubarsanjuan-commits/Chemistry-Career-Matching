import React, { useState } from 'react';
import { MatchResult } from '../utils/matcher';
import { Career, StudentProfile } from '../types';
import { Award, Sparkles, Filter, ArrowRight, ArrowLeft, Shuffle, ChevronRight, FlaskConical, Atom } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NarrowingFunnelViewProps {
  matchResults: MatchResult[];
  profile: StudentProfile;
  selectedTop5Ids: string[];
  onSetTop5Ids: (ids: string[]) => void;
  onOpenCareer: (career: Career) => void;
  onGoToTop5Dashboard: () => void;
  onBackToWizard: () => void;
}

export const NarrowingFunnelView: React.FC<NarrowingFunnelViewProps> = ({
  matchResults,
  profile,
  selectedTop5Ids,
  onSetTop5Ids,
  onOpenCareer,
  onGoToTop5Dashboard,
  onBackToWizard,
}) => {
  const [funnelStage, setFunnelStage] = useState<'80' | '25' | '10' | '5'>('5');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284C7', '#0F172A', '#16A34A', '#DB2777'],
      });
    } catch (e) {
      // ignore
    }
  };

  const top5Careers = matchResults
    .filter((r) => selectedTop5Ids.includes(r.career.id))
    .slice(0, 5);

  const runnerUps = matchResults
    .filter((r) => !selectedTop5Ids.includes(r.career.id))
    .slice(0, 8);

  const swapCareer = (outgoingId: string, incomingId: string) => {
    const updated = selectedTop5Ids.map((id) => (id === outgoingId ? incomingId : id));
    onSetTop5Ids(updated);
  };

  return (
    <div className="space-y-6">
      {/* Funnel Progress Visualizer */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#0284C7] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
              <Filter className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Multi-Stage Fractional Distillation Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              80 Chemistry Careers Distilled to Your Final 5
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed">
              Based on your academic disciplines ({profile.selectedSubjects.join(', ') || 'All Disciplines'}), catalytic interests ({profile.selectedInterests.join(', ') || 'All Interests'}), and hobbies ({profile.selectedHobbies.join(', ') || 'General'}).
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToWizard}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] text-xs font-mono font-bold uppercase tracking-wider border border-[#CBD5E1] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Filters</span>
            </button>
            <button
              id="view-top5-details-btn"
              onClick={() => {
                triggerConfetti();
                onGoToTop5Dashboard();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer border border-[#0F172A]"
            >
              <Award className="w-4 h-4 text-[#38BDF8]" />
              <span>Explore Top 5 Spotlight</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </button>
          </div>
        </div>

        {/* Funnel Cascade Indicator */}
        <div className="mt-6 pt-6 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div 
            onClick={() => setFunnelStage('80')}
            className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
              funnelStage === '80'
                ? 'bg-white border-2 border-[#0F172A] shadow-xs'
                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
            }`}
          >
            <span className="text-[10px] text-[#64748B] block uppercase font-mono font-bold tracking-wider">Stage 1: Feedstock</span>
            <span className="text-xl font-bold font-mono text-[#0F172A]">80 Careers</span>
            <span className="text-xs text-[#64748B] block mt-0.5 font-sans">Full Chemical Spectrum</span>
          </div>

          <div 
            onClick={() => setFunnelStage('25')}
            className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
              funnelStage === '25'
                ? 'bg-white border-2 border-[#0F172A] shadow-xs'
                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
            }`}
          >
            <span className="text-[10px] text-[#64748B] block uppercase font-mono font-bold tracking-wider">Stage 2: Reagents</span>
            <span className="text-xl font-bold font-mono text-[#0F172A]">25 Matches</span>
            <span className="text-xs text-[#64748B] block mt-0.5 font-sans">Discipline Overlap</span>
          </div>

          <div 
            onClick={() => setFunnelStage('10')}
            className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
              funnelStage === '10'
                ? 'bg-white border-2 border-[#0F172A] shadow-xs'
                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
            }`}
          >
            <span className="text-[10px] text-[#64748B] block uppercase font-mono font-bold tracking-wider">Stage 3: Catalysts</span>
            <span className="text-xl font-bold font-mono text-[#0F172A]">10 Finalists</span>
            <span className="text-xs text-[#64748B] block mt-0.5 font-sans">Passions & Hobbies</span>
          </div>

          <div 
            onClick={() => setFunnelStage('5')}
            className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
              funnelStage === '5'
                ? 'bg-white border-2 border-[#0284C7] shadow-sm'
                : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
            }`}
          >
            <span className="text-[10px] text-[#0284C7] block uppercase font-mono font-bold tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-[#0284C7]" />
              Stage 4: Distillate
            </span>
            <span className="text-xl font-bold font-mono text-[#0284C7]">Top 5 Selected</span>
            <span className="text-xs text-[#0369A1] block mt-0.5 font-semibold font-sans">Prime Career Pathways</span>
          </div>
        </div>
      </div>

      {/* Primary Top 5 Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0284C7]" />
            <h3 className="text-lg font-bold text-[#0F172A]">
              Your Top 5 Recommended Chemistry Career Pathways
            </h3>
          </div>
          <span className="text-xs text-[#64748B] hidden sm:inline font-mono">
            Click any career for dossier or swap with runner-ups below
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {top5Careers.map((result, index) => {
            const { career, score, reasons } = result;
            return (
              <div
                key={career.id}
                id={`top5-funnel-card-${career.id}`}
                className="bg-white border border-[#CBD5E1] border-l-4 border-l-[#0284C7] rounded-xl p-5 relative flex flex-col justify-between group transition-all shadow-xs hover:shadow-md"
              >
                {/* Number & Match Score Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-6 h-6 rounded-lg bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold font-mono">
                      #{index + 1}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-mono font-bold">
                      <Sparkles className="w-3 h-3 text-[#22C55E]" />
                      <span>{score}% Match</span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h4 
                    onClick={() => onOpenCareer(career)}
                    className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] cursor-pointer transition-colors leading-snug"
                  >
                    {career.title}
                  </h4>
                  <span className="inline-block text-[11px] font-mono font-semibold text-[#0369A1] bg-[#E0F2FE] px-2 py-0.5 rounded mt-1.5 border border-[#BAE6FD]">
                    {career.chemistrySubfield}
                  </span>

                  <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                    {career.tagline}
                  </p>

                  {/* Why it matched */}
                  <div className="mt-3 pt-3 border-t border-[#F1F5F9] space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-mono font-bold block tracking-wider">
                      Alignment Synthesis:
                    </span>
                    <p className="text-xs text-[#334155] italic line-clamp-2">
                      {reasons[0] || 'High affinity with your chemical profile.'}
                    </p>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                  <div className="text-[11px] text-[#64748B] truncate max-w-[130px]" title={career.workEnvironment}>
                    <span className="font-semibold text-[#0F172A]">{career.workEnvironment.split('/')[0]}</span>
                  </div>

                  <button
                    onClick={() => onOpenCareer(career)}
                    className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] transition-colors flex items-center gap-1 text-xs font-mono font-bold border border-[#CBD5E1] cursor-pointer"
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

      {/* Runner-Ups / Swap Section */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[#0F172A] font-bold text-sm">
              <Shuffle className="w-4 h-4 text-[#0284C7]" />
              <h4>Close Runner-Up Candidates (Rank #6 to #13)</h4>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Want to customize your final 5? Click "Swap into #5" to replace one of your active recommendations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {runnerUps.map((result, idx) => {
            const { career, score } = result;
            return (
              <div
                key={career.id}
                className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-mono font-bold text-[#64748B]">
                      Rank #{idx + 6}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0284C7]">
                      {score}% Match
                    </span>
                  </div>
                  <h5 
                    onClick={() => onOpenCareer(career)}
                    className="text-xs sm:text-sm font-bold text-[#0F172A] group-hover:text-[#0284C7] cursor-pointer transition-colors"
                  >
                    {career.title}
                  </h5>
                  <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                    {career.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => onOpenCareer(career)}
                    className="flex-1 py-1 px-2 rounded-lg bg-white hover:bg-[#F8FAFC] text-[11px] font-mono font-semibold text-[#334155] border border-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    Dossier
                  </button>
                  <button
                    onClick={() => swapCareer(selectedTop5Ids[4] || selectedTop5Ids[selectedTop5Ids.length - 1], career.id)}
                    className="flex-1 py-1 px-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#0F172A] text-[11px] text-white font-mono font-bold transition-colors cursor-pointer"
                  >
                    Swap in #5
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
