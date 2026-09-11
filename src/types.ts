export type CareerCategory = 
  | 'Research & Discovery'
  | 'Engineers'
  | 'Health & Medicine'
  | 'Food, Farming & Nature'
  | 'Arts, Design & Sports'
  | 'Law & Government'
  | 'Public Safety & Exploration'
  | 'Business, Media & Education';

export interface Career {
  id: string;
  number: number; // 1 to 80
  title: string;
  category: CareerCategory;
  tagline: string;
  description: string;
  chemistrySubfield: 
    | 'Organic Chemistry'
    | 'Inorganic Chemistry'
    | 'Physical Chemistry'
    | 'Analytical Chemistry'
    | 'Biochemistry'
    | 'Computational Chemistry'
    | 'Materials Chemistry'
    | 'Environmental Chemistry'
    | 'Chemical Engineering & Applied'
    | 'Forensic & Regulatory Chemistry';
  favoriteSubjects: string[];
  interests: string[];
  workEnvironment: string;
  educationLevel: string;
  jobOutlookGrowth: string;
  dayInTheLife: string;
  topSkills: string[];
  sampleEmployers: string[];
  highSchoolTips: string[];
  chemistryImpact?: string;
  matchScore?: number;
  matchReasons?: string[];
}

export interface StudentProfile {
  name: string;
  gradeLevel: 'Middle School' | 'High School (9-10)' | 'High School (11-12)' | 'Undergraduate' | 'Career Explorer';
  selectedSubjects: string[];
  selectedInterests: string[];
  selectedHobbies: string[];
  workEnvPreference: string;
  targetChemistrySubfield?: string;
}

export interface SubjectOption {
  id: string;
  name: string;
  iconName: string;
  description: string;
  color: string;
  elementSymbol?: string;
  atomicNumber?: number;
  chemistryBridge?: string;
  chemicalFormula?: string;
}

export interface InterestOption {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description: string;
  catalystCode?: string;
  chemistryMechanism?: string;
}

export interface HobbyOption {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description: string;
  chemistryLink: string;
  hobbyTag: string;
}

export type StepKey = 'subjects' | 'interests' | 'hobbies' | 'environment' | 'narrowing' | 'top5' | 'explorer';
