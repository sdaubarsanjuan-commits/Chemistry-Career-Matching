import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Heart, Sparkles, Check, Atom, Search, X, Filter } from 'lucide-react';
import { HOBBY_OPTIONS } from '../data/subjectsAndInterests';
import { IconHelper } from './IconHelper';

interface WizardStepHobbiesProps {
  selectedHobbies: string[];
  onToggleHobby: (hobbyId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  filteredCount: number;
}

export const WizardStepHobbies: React.FC<WizardStepHobbiesProps> = ({
  selectedHobbies,
  onToggleHobby,
  onNext,
  onPrev,
  filteredCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Extract distinct categories
  const categories = useMemo(() => Array.from(new Set(HOBBY_OPTIONS.map((h) => h.category))), []);

  // Filtered hobbies
  const filteredHobbies = useMemo(() => {
    return HOBBY_OPTIONS.filter((hobby) => {
      const matchesCategory = activeCategoryFilter === 'all' || hobby.category === activeCategoryFilter;
      const matchesSearch = searchQuery.trim() === '' ||
        hobby.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hobby.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hobby.chemistryLink.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hobby.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryFilter, searchQuery]);

  // Group filtered hobbies by category
  const groupedCategories = useMemo(() => {
    const groups: { category: string; items: typeof HOBBY_OPTIONS }[] = [];
    categories.forEach((cat) => {
      const items = filteredHobbies.filter((h) => h.category === cat);
      if (items.length > 0) {
        groups.push({ category: cat, items });
      }
    });
    return groups;
  }, [categories, filteredHobbies]);

  return (
    <div className="space-y-6">
      {/* Synthesis Pipeline Header */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle Watermark Orbital */}
        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none text-[#0F172A]">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
            <ellipse cx="50" cy="50" rx="42" ry="18" stroke="currentColor" strokeWidth="3" fill="none" transform="rotate(45 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="18" stroke="currentColor" strokeWidth="3" fill="none" transform="rotate(-45 50 50)" />
          </svg>
        </div>

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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F172A] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
            <Heart className="w-3.5 h-3.5 text-[#EC4899]" />
            Phase 3: 28 High School Hobbies & Pursuits
          </span>
          <span className="text-[#94A3B8] text-xs font-mono">→</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#64748B] text-[10px] font-mono font-semibold uppercase">
            Phase 4: Lab Setting
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#DB2777] font-bold mb-1.5">
              <Heart className="w-4 h-4 text-[#EC4899]" />
              <span>Real-World Hobbies & Passion Substrates (28 Options)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
              What hobbies & personal passions do you enjoy outside of class?
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2">
              Chemistry is the invisible superpower behind everyday passions—from specialty coffee extraction and gaming hardware cooling to sneaker dyeing, darkroom photo chemistry, track athletics, and aquarium ecology. Choose any hobbies you enjoy.
            </p>
          </div>

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
                id="hobbies-back-btn"
                onClick={onPrev}
                className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] text-xs font-mono font-bold uppercase tracking-wider border border-[#CBD5E1] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Phase 2</span>
              </button>
              <button
                id="hobbies-continue-btn"
                onClick={onNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm border border-[#0F172A]"
              >
                <span>Continue to Setting</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </button>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="hobbies-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 28 hobbies (e.g., coffee, gaming, sports, art, cars, music)..."
              className="w-full pl-9 pr-8 py-2 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs font-sans text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#DB2777]/30 focus:border-[#DB2777]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
            <span className="font-bold text-[#0F172A]">{filteredHobbies.length}</span> of {HOBBY_OPTIONS.length} Hobbies Shown
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer border ${
              activeCategoryFilter === 'all'
                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
            }`}
          >
            All Clusters ({HOBBY_OPTIONS.length})
          </button>
          {categories.map((cat) => {
            const count = HOBBY_OPTIONS.filter((h) => h.category === cat).length;
            const isSelected = activeCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-[#DB2777] text-white border-[#DB2777] font-bold'
                    : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Selected Hobbies Summary */}
        <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
            Selected ({selectedHobbies.length}):
          </span>
          {selectedHobbies.length === 0 ? (
            <span className="text-xs text-[#94A3B8] italic font-sans">
              No hobbies selected yet (optional or select multiple to enrich your profile)
            </span>
          ) : (
            selectedHobbies.map((hobbyId) => {
              const item = HOBBY_OPTIONS.find((h) => h.id === hobbyId);
              return (
                <span
                  key={hobbyId}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FCE7F3] border border-[#FBCFE8] text-xs font-semibold text-[#9D174D] font-mono"
                >
                  <span className="text-[10px] font-bold px-1 py-0.2 bg-[#FBCFE8] rounded text-[#831843]">
                    {item?.hobbyTag?.replace('HOBBY-', '') || 'HOBBY'}
                  </span>
                  <span>{hobbyId}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleHobby(hobbyId);
                    }}
                    className="hover:text-rose-700 ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Categorized Hobby Cards */}
      <div className="space-y-8">
        {groupedCategories.map(({ category, items }) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
              <h3 className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#DB2777] rounded-xs" />
                <span>Cluster: {category}</span>
              </h3>
              <span className="text-[10px] font-mono text-[#64748B] uppercase">
                {items.length} {items.length === 1 ? 'Pursuit' : 'Pursuits'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((hobby) => {
                const isSelected = selectedHobbies.includes(hobby.id);

                return (
                  <div
                    key={hobby.id}
                    id={`hobby-card-${hobby.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => onToggleHobby(hobby.id)}
                    className={`p-5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between group relative overflow-hidden ${
                      isSelected
                        ? 'bg-white border-[#DB2777] ring-2 ring-[#DB2777]/20 shadow-md'
                        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#F1F5F9]">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-[#FCE7F3] text-[#BE185D]' : 'bg-[#F8FAFC] text-[#64748B] group-hover:text-[#0F172A]'
                        }`}>
                          <IconHelper name={hobby.iconName} className="w-5 h-5" />
                        </div>

                        {/* Tag Badge */}
                        <span className="text-[10px] font-mono text-[#64748B] bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                          {hobby.hobbyTag}
                        </span>

                        {/* Checkbox */}
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#DB2777] border-[#DB2777] text-white'
                            : 'border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]'
                        }`}>
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-3.5">
                        <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#BE185D] transition-colors">
                          {hobby.name}
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed mt-2 line-clamp-2">
                          {hobby.description}
                        </p>
                      </div>
                    </div>

                    {/* Chemical Mechanism Tag */}
                    <div className="mt-4 pt-2.5 border-t border-[#F1F5F9]">
                      <div className="text-[10px] font-mono text-[#9D174D] font-medium flex items-center gap-1" title={hobby.chemistryLink}>
                        <Atom className="w-2.5 h-2.5 shrink-0 text-[#DB2777]" />
                        <span className="truncate">{hobby.chemistryLink}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {groupedCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#CBD5E1] p-6">
            <p className="text-sm text-[#64748B] font-mono">No hobbies matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryFilter('all');
              }}
              className="mt-3 px-4 py-1.5 bg-[#F1F5F9] text-[#0F172A] text-xs font-mono font-bold rounded-md hover:bg-[#E2E8F0]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white border border-[#CBD5E1] rounded-xl gap-4 shadow-xs">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] text-xs font-mono font-bold uppercase tracking-wider border border-[#CBD5E1] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Passions</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm"
        >
          <span>Next: Laboratory Setting</span>
          <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
        </button>
      </div>
    </div>
  );
};

