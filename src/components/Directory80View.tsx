import React, { useState } from 'react';
import { Career } from '../types';
import { 
  Search, 
  Star, 
  ChevronRight,
  FlaskConical,
  Layers,
  GraduationCap
} from 'lucide-react';

interface Directory80ViewProps {
  careers: Career[];
  onOpenCareer: (career: Career) => void;
  selectedTop5Ids: string[];
  onTogglePinInTop5: (careerId: string) => void;
}

export const Directory80View: React.FC<Directory80ViewProps> = ({
  careers,
  onOpenCareer,
  selectedTop5Ids,
  onTogglePinInTop5,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedEnv, setSelectedEnv] = useState<string>('All');

  const categories = [
    'All',
    'Research & Discovery',
    'Engineers',
    'Health & Medicine',
    'Food, Farming & Nature',
    'Arts, Design & Sports',
    'Law & Government',
    'Public Safety & Exploration',
    'Business, Media & Education',
  ];

  const filtered = careers.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.chemistrySubfield.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.chemistryImpact && c.chemistryImpact.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.topSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDegree = selectedDegree === 'All' || c.educationLevel.toLowerCase().includes(selectedDegree.toLowerCase());
    const matchesEnv = selectedEnv === 'All' || c.workEnvironment.toLowerCase().includes(selectedEnv.toLowerCase());

    return matchesSearch && matchesCategory && matchesDegree && matchesEnv;
  });

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0284C7] text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
              <Layers className="w-4 h-4 text-[#0284C7]" />
              <span>Comprehensive 80-Career Chemistry Atlas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              Explore All 80 Chemistry Pathways
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm mt-1.5 leading-relaxed">
              Browse specializations across Research & Discovery, Engineering, Healthcare, Nature & Agriculture, Arts & Sports, Law & Government, Public Safety, and Business.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">Database Status</span>
            <span className="text-lg font-bold font-mono text-[#0F172A]">
              {filtered.length} of {careers.length} Careers
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-6 border-t border-[#E2E8F0] space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by career title, description, chemistry subfield (e.g. Organic, Analytical), skills, or keywords..."
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0F172A] focus:bg-white rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all font-sans"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-xs border border-[#0F172A]'
                    : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#64748B] font-mono font-semibold text-[11px] uppercase tracking-wider">Education Level:</span>
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-md px-2.5 py-1 text-[#0F172A] outline-none text-xs font-medium font-mono"
              >
                <option value="All">All Degrees</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="Ph.D.">Ph.D. / Professional Degree</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#64748B] font-mono font-semibold text-[11px] uppercase tracking-wider">Work Setting:</span>
              <select
                value={selectedEnv}
                onChange={(e) => setSelectedEnv(e.target.value)}
                className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-md px-2.5 py-1 text-[#0F172A] outline-none text-xs font-medium font-mono"
              >
                <option value="All">All Environments</option>
                <option value="Lab">Lab & Research Bench</option>
                <option value="Field">Field & Outdoors</option>
                <option value="Desk">Desk & Computational</option>
                <option value="Hospital">Hospital / Clinical</option>
                <option value="Plant">Industrial Plant</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((career) => {
          const isPinned = selectedTop5Ids.includes(career.id);
          return (
            <div
              key={career.id}
              id={`dir-career-card-${career.id}`}
              className="bg-white border border-[#CBD5E1] rounded-xl p-5 relative flex flex-col justify-between group transition-all hover:border-[#94A3B8] shadow-xs"
            >
              <div>
                {/* Top Number & Pin Button */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="w-6 h-6 rounded-md bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs font-mono">
                    #{career.number}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePinInTop5(career.id);
                    }}
                    title={isPinned ? 'Remove from Top 5' : 'Pin in Top 5'}
                    className={`p-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      isPinned 
                        ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]' 
                        : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] border border-[#CBD5E1]'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-current text-[#D97706]' : ''}`} />
                  </button>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block truncate">
                  {career.category}
                </span>

                <h3 
                  onClick={() => onOpenCareer(career)}
                  className="text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] cursor-pointer transition-colors mt-0.5 leading-snug"
                >
                  {career.title}
                </h3>

                <p className="text-xs text-[#64748B] mt-1.5 line-clamp-3 leading-relaxed">
                  {career.description}
                </p>

                {/* Subfield chip */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-[#0369A1] bg-[#E0F2FE] border border-[#BAE6FD]">
                    {career.chemistrySubfield}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] truncate max-w-[140px]" title={career.workEnvironment}>
                    {career.workEnvironment}
                  </span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[#64748B] text-[11px] truncate max-w-[130px]" title={career.educationLevel}>
                  <GraduationCap className="w-3.5 h-3.5 shrink-0 text-[#64748B]" />
                  <span className="truncate font-mono">{career.educationLevel.split('/')[0]}</span>
                </div>

                <button
                  onClick={() => onOpenCareer(career)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] text-[#334155] hover:text-white text-xs font-mono font-bold border border-[#CBD5E1] hover:border-[#0F172A] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-[#CBD5E1] rounded-xl p-8">
          <FlaskConical className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#0F172A]">No matching careers found</h3>
          <p className="text-xs text-[#64748B] mt-1 font-mono">
            Try adjusting your search keywords or clearing filter categories.
          </p>
        </div>
      )}
    </div>
  );
};
