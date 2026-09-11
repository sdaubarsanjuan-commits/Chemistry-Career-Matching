/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { StepKey, StudentProfile, Career } from './types';
import { CAREERS_80 } from './data/careersData';
import { calculateCareerMatches } from './utils/matcher';
import { Header } from './components/Header';
import { WizardStepSubjects } from './components/WizardStepSubjects';
import { WizardStepInterests } from './components/WizardStepInterests';
import { WizardStepHobbies } from './components/WizardStepHobbies';
import { WizardStepEnvironment } from './components/WizardStepEnvironment';
import { NarrowingFunnelView } from './components/NarrowingFunnelView';
import { Top5Dashboard } from './components/Top5Dashboard';
import { Directory80View } from './components/Directory80View';
import { CareerModal } from './components/CareerModal';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Student Explorer',
  gradeLevel: 'High School (11-12)',
  selectedSubjects: [],
  selectedInterests: [],
  selectedHobbies: [],
  workEnvPreference: 'Any / No Preference',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepKey>('subjects');
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [activeCareerModal, setActiveCareerModal] = useState<Career | null>(null);
  const [customTop5Ids, setCustomTop5Ids] = useState<string[]>([]);

  // Compute calculated match results
  const matchResults = useMemo(() => {
    return calculateCareerMatches(profile, CAREERS_80);
  }, [profile]);

  // Derive top 5 IDs automatically, unless custom user pins/swaps override
  const activeTop5Ids = useMemo(() => {
    if (customTop5Ids.length === 5) {
      return customTop5Ids;
    }
    return matchResults.slice(0, 5).map((r) => r.career.id);
  }, [matchResults, customTop5Ids]);

  const top5Careers = useMemo(() => {
    return activeTop5Ids
      .map((id) => CAREERS_80.find((c) => c.id === id))
      .filter((c): c is Career => Boolean(c));
  }, [activeTop5Ids]);

  const toggleSubject = (subjectId: string) => {
    setProfile((prev) => {
      const exists = prev.selectedSubjects.includes(subjectId);
      const updated = exists
        ? prev.selectedSubjects.filter((s) => s !== subjectId)
        : [...prev.selectedSubjects, subjectId];
      return { ...prev, selectedSubjects: updated };
    });
    setCustomTop5Ids([]); // reset manual locks on filter changes
  };

  const toggleInterest = (interestId: string) => {
    setProfile((prev) => {
      const exists = prev.selectedInterests.includes(interestId);
      const updated = exists
        ? prev.selectedInterests.filter((i) => i !== interestId)
        : [...prev.selectedInterests, interestId];
      return { ...prev, selectedInterests: updated };
    });
    setCustomTop5Ids([]);
  };

  const toggleHobby = (hobbyId: string) => {
    setProfile((prev) => {
      const exists = prev.selectedHobbies.includes(hobbyId);
      const updated = exists
        ? prev.selectedHobbies.filter((h) => h !== hobbyId)
        : [...prev.selectedHobbies, hobbyId];
      return { ...prev, selectedHobbies: updated };
    });
    setCustomTop5Ids([]);
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    setCustomTop5Ids([]);
  };

  const handleReset = () => {
    setProfile({
      name: 'Student Explorer',
      gradeLevel: 'High School (11-12)',
      selectedSubjects: [],
      selectedInterests: [],
      selectedHobbies: [],
      workEnvPreference: 'Any / No Preference',
    });
    setCustomTop5Ids([]);
    setCurrentStep('subjects');
  };

  const handleSelectPreset = (presetId: string) => {
    setCustomTop5Ids([]);
    if (presetId === 'biomed') {
      setProfile({
        name: 'Biomedical Explorer',
        gradeLevel: 'High School (11-12)',
        selectedSubjects: ['Biology', 'Health Science', 'Mathematics'],
        selectedInterests: ['Curing Diseases & Pharma', 'Clinical Diagnostics & Hospital Lab'],
        selectedHobbies: ['Cooking & Baking', 'Sports & Weightlifting'],
        workEnvPreference: 'Lab / Research Bench',
      });
      setCurrentStep('narrowing');
    } else if (presetId === 'climate') {
      setProfile({
        name: 'Climate & Clean Tech Leader',
        gradeLevel: 'High School (11-12)',
        selectedSubjects: ['Environmental Science', 'Physics', 'Engineering'],
        selectedInterests: ['Clean Energy & Batteries', 'Climate Action & Carbon Capture', 'Water & Soil Protection'],
        selectedHobbies: ['Gardening & Botany', 'Hiking & Rock Geology'],
        workEnvPreference: 'Lab / Research Bench',
      });
      setCurrentStep('narrowing');
    } else if (presetId === 'forensics') {
      setProfile({
        name: 'Forensics & Justice Investigator',
        gradeLevel: 'High School (11-12)',
        selectedSubjects: ['Law & Government', 'Biology', 'Physics'],
        selectedInterests: ['Solving Crimes & Forensic Evidence', 'Consumer Safety & Toxic Prevention'],
        selectedHobbies: ['True Crime & Forensics Puzzles', 'Chess & Strategy Board Games'],
        workEnvPreference: 'Lab / Research Bench',
      });
      setCurrentStep('narrowing');
    } else if (presetId === 'tech') {
      setProfile({
        name: 'AI & Quantum Pioneer',
        gradeLevel: 'Undergraduate',
        selectedSubjects: ['Computer Science', 'Physics', 'Mathematics'],
        selectedInterests: ['AI & Molecular Simulation', 'Semiconductors & Nanomaterials', 'Robotics & Lab Automation'],
        selectedHobbies: ['Video Games & Esports', 'PC Building & Hardware', 'DIY 3D Printing & CAD'],
        workEnvPreference: 'Desk / Office / Computational',
      });
      setCurrentStep('narrowing');
    } else if (presetId === 'cosmetics') {
      setProfile({
        name: 'Cosmetic & Fragrance Artisan',
        gradeLevel: 'High School (11-12)',
        selectedSubjects: ['Art & Design', 'Biology', 'Business & Economics'],
        selectedInterests: ['Skincare, Makeup & Fragrances', 'Food Science & Fermentation'],
        selectedHobbies: ['Skincare & DIY Cosmetics', 'Perfumery & Scent Crafting'],
        workEnvPreference: 'Lab / Research Bench',
      });
      setCurrentStep('narrowing');
    } else if (presetId === 'law') {
      setProfile({
        name: 'Patent Attorney & Policy Scholar',
        gradeLevel: 'High School (11-12)',
        selectedSubjects: ['Law & Government', 'English & Communications', 'Business & Economics'],
        selectedInterests: ['Patent Law & Tech Commercialization', 'Government Policy & EPA Regulation'],
        selectedHobbies: ['Speech, Debate & Model UN', 'Creative Writing & Science Media'],
        workEnvPreference: 'Desk / Office / Computational',
      });
      setCurrentStep('narrowing');
    }
  };

  const togglePinInTop5 = (careerId: string) => {
    if (activeTop5Ids.includes(careerId)) {
      // replace with next best match
      const nextBest = matchResults.find((m) => !activeTop5Ids.includes(m.career.id) && m.career.id !== careerId);
      if (nextBest) {
        setCustomTop5Ids(activeTop5Ids.map((id) => (id === careerId ? nextBest.career.id : id)));
      }
    } else {
      // replace position 5 with this career
      const updated = [...activeTop5Ids.slice(0, 4), careerId];
      setCustomTop5Ids(updated);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] flex flex-col font-sans antialiased">
      {/* Navigation Header */}
      <Header
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onReset={handleReset}
        onSelectPreset={handleSelectPreset}
        totalCareersCount={CAREERS_80.length}
        hasMatches={matchResults.length > 0}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Wizard Step 1: Subjects */}
        {currentStep === 'subjects' && (
          <WizardStepSubjects
            selectedSubjects={profile.selectedSubjects}
            onToggleSubject={toggleSubject}
            onNext={() => setCurrentStep('interests')}
            filteredCount={matchResults.filter((m) => m.score >= 50).length || 80}
          />
        )}

        {/* Wizard Step 2: Interests */}
        {currentStep === 'interests' && (
          <WizardStepInterests
            selectedInterests={profile.selectedInterests}
            onToggleInterest={toggleInterest}
            onPrev={() => setCurrentStep('subjects')}
            onNext={() => setCurrentStep('hobbies')}
            filteredCount={matchResults.filter((m) => m.score >= 60).length || 25}
          />
        )}

        {/* Wizard Step 3: Hobbies */}
        {currentStep === 'hobbies' && (
          <WizardStepHobbies
            selectedHobbies={profile.selectedHobbies}
            onToggleHobby={toggleHobby}
            onPrev={() => setCurrentStep('interests')}
            onNext={() => setCurrentStep('environment')}
            filteredCount={matchResults.filter((m) => m.score >= 65).length || 15}
          />
        )}

        {/* Wizard Step 4: Environment & Settings */}
        {currentStep === 'environment' && (
          <WizardStepEnvironment
            profile={profile}
            onUpdateProfile={updateProfile}
            onPrev={() => setCurrentStep('hobbies')}
            onCalculate={() => setCurrentStep('narrowing')}
            filteredCount={matchResults.filter((m) => m.score >= 70).length || 10}
          />
        )}

        {/* Funnel: Multi-Stage Distillation View */}
        {currentStep === 'narrowing' && (
          <NarrowingFunnelView
            matchResults={matchResults}
            profile={profile}
            selectedTop5Ids={activeTop5Ids}
            onSetTop5Ids={(ids) => setCustomTop5Ids(ids)}
            onOpenCareer={(career) => setActiveCareerModal(career)}
            onGoToTop5Dashboard={() => setCurrentStep('top5')}
            onBackToWizard={() => setCurrentStep('subjects')}
          />
        )}

        {/* Top 5 Spotlight Dashboard & Comparison */}
        {currentStep === 'top5' && (
          <Top5Dashboard
            top5Careers={top5Careers}
            matchResults={matchResults}
            profile={profile}
            onOpenCareer={(career) => setActiveCareerModal(career)}
            onBackToFunnel={() => setCurrentStep('narrowing')}
          />
        )}

        {/* Explorer: All 80 Chemistry Careers Directory */}
        {currentStep === 'explorer' && (
          <Directory80View
            careers={CAREERS_80}
            onOpenCareer={(career) => setActiveCareerModal(career)}
            selectedTop5Ids={activeTop5Ids}
            onTogglePinInTop5={togglePinInTop5}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#CBD5E1] bg-[#F8FAFC] py-6 text-center text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
          <span>
            ChemPath Finder • Analytical chemistry career synthesis & pathway discovery.
          </span>
          <span className="text-[#94A3B8]">
            80 Verified Specializations • Grounded in ACS & BLS Classifications
          </span>
        </div>
      </footer>

      {/* Career Detail Modal */}
      <CareerModal
        career={activeCareerModal}
        onClose={() => setActiveCareerModal(null)}
        isPinnedInTop5={activeCareerModal ? activeTop5Ids.includes(activeCareerModal.id) : false}
        onTogglePinInTop5={togglePinInTop5}
      />
    </div>
  );
}
