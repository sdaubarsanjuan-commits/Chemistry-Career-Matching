import { Career, StudentProfile } from '../types';
import { CAREERS_80 } from '../data/careersData';

export interface MatchResult {
  career: Career;
  score: number; // 0 to 100
  matchedSubjects: string[];
  matchedInterests: string[];
  matchedHobbies: string[];
  reasons: string[];
}

const HOBBY_CAREER_MAP: Record<string, {
  categories?: string[];
  subfields?: string[];
  keywords?: string[];
  interestIds?: string[];
}> = {
  // 1. Culinary & Food Science
  'Cooking & Baking': {
    categories: ['Food, Farming & Nature', 'Arts, Design & Sports', 'Business, Media & Education'],
    subfields: ['Organic Chemistry', 'Biochemistry', 'Analytical Chemistry'],
    keywords: ['food', 'flavor', 'brew', 'fermentation', 'taste', 'sensory', 'culinary', 'dairy', 'agriculture', 'nutrition', 'baker', 'beverage', 'meat'],
    interestIds: ['Food Science & Fermentation', 'Agriculture, Soil & Sustainable Crops', 'Cosmetics, Skincare & Fragrance Formulation'],
  },
  'Coffee & Tea Craft': {
    categories: ['Food, Farming & Nature', 'Business, Media & Education'],
    subfields: ['Analytical Chemistry', 'Organic Chemistry', 'Biochemistry'],
    keywords: ['flavor', 'beverage', 'extraction', 'coffee', 'tea', 'sensory', 'food', 'analytical', 'natural product', 'aroma'],
    interestIds: ['Food Science & Fermentation', 'Cosmetics, Skincare & Fragrance Formulation'],
  },

  // 2. Living Systems & Nature
  'Gardening & Botany': {
    categories: ['Food, Farming & Nature', 'Research & Discovery', 'Law & Government'],
    subfields: ['Environmental Chemistry', 'Biochemistry', 'Organic Chemistry'],
    keywords: ['plant', 'botanical', 'soil', 'agriculture', 'crop', 'fertilizer', 'ecology', 'forestry', 'ecosystem', 'horticulture', 'phytochemistry', 'natural'],
    interestIds: ['Agriculture, Soil & Sustainable Crops', 'Environmental Remediation & Clean Water', 'Forest & Biodiversity Conservation'],
  },
  'Aquariums & Marine Life': {
    categories: ['Food, Farming & Nature', 'Public Safety & Exploration', 'Research & Discovery'],
    subfields: ['Environmental Chemistry', 'Analytical Chemistry', 'Biochemistry'],
    keywords: ['ocean', 'marine', 'water', 'aquatic', 'coral', 'fish', 'salinity', 'aquarium', 'ecology', 'limnology'],
    interestIds: ['Oceanography & Marine Chemistry', 'Environmental Remediation & Clean Water', 'Forest & Biodiversity Conservation'],
  },
  'Hiking & Rock Geology': {
    categories: ['Public Safety & Exploration', 'Research & Discovery', 'Food, Farming & Nature'],
    subfields: ['Environmental Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
    keywords: ['mineral', 'geochemist', 'geology', 'rock', 'volcano', 'mining', 'earth', 'crystallography', 'field', 'fossil'],
    interestIds: ['Volcanology & Deep Earth Geochemistry', 'Oceanography & Marine Chemistry', 'Environmental Remediation & Clean Water'],
  },
  'Camping & Outdoor Survival': {
    categories: ['Public Safety & Exploration', 'Food, Farming & Nature', 'Law & Government'],
    subfields: ['Environmental Chemistry', 'Analytical Chemistry', 'Forensic & Regulatory Chemistry'],
    keywords: ['water', 'survival', 'purification', 'field', 'fire', 'emergency', 'toxicology', 'hazard', 'wilderness', 'environment'],
    interestIds: ['Environmental Remediation & Clean Water', 'Forest & Biodiversity Conservation', 'Consumer Safety & Toxic Prevention'],
  },
  'Surfing & Ocean Exploration': {
    categories: ['Public Safety & Exploration', 'Food, Farming & Nature', 'Arts, Design & Sports'],
    subfields: ['Environmental Chemistry', 'Materials Chemistry', 'Biochemistry'],
    keywords: ['ocean', 'marine', 'seawater', 'coastal', 'climate', 'waves', 'textile', 'polymer', 'algae'],
    interestIds: ['Oceanography & Marine Chemistry', 'Environmental Remediation & Clean Water', 'Sports Nutrition & Athletic Chemistry'],
  },

  // 3. Cosmetics, Scents & Self-Care
  'Skincare & DIY Cosmetics': {
    categories: ['Arts, Design & Sports', 'Research & Discovery', 'Health & Medicine'],
    subfields: ['Organic Chemistry', 'Analytical Chemistry', 'Materials Chemistry'],
    keywords: ['cosmetic', 'skincare', 'lotion', 'soap', 'formulation', 'emulsion', 'dermatology', 'skin', 'beauty', 'surfactant', 'personal care'],
    interestIds: ['Cosmetics, Skincare & Fragrance Formulation', 'Consumer Safety & Toxic Prevention', 'Color, Pigments & Dyes'],
  },
  'Perfumery & Scent Crafting': {
    categories: ['Arts, Design & Sports', 'Food, Farming & Nature', 'Research & Discovery'],
    subfields: ['Organic Chemistry', 'Analytical Chemistry', 'Biochemistry'],
    keywords: ['fragrance', 'perfume', 'scent', 'aroma', 'essential oil', 'flavor', 'volatile', 'olfactory', 'candle', 'ester'],
    interestIds: ['Cosmetics, Skincare & Fragrance Formulation', 'Food Science & Fermentation', 'Color, Pigments & Dyes'],
  },

  // 4. Visual Arts, Design & Craft
  'Painting & Fine Arts': {
    categories: ['Arts, Design & Sports', 'Research & Discovery', 'Public Safety & Exploration'],
    subfields: ['Materials Chemistry', 'Inorganic Chemistry', 'Analytical Chemistry'],
    keywords: ['art', 'paint', 'pigment', 'color', 'dye', 'canvas', 'varnish', 'conservation', 'museum', 'spectroscopy', 'coatings'],
    interestIds: ['Art Conservation & Historic Artifacts', 'Color, Pigments & Dyes', 'Plastics, Polymers & Circular Economy'],
  },
  'Pottery & Ceramics': {
    categories: ['Arts, Design & Sports', 'Engineers', 'Research & Discovery'],
    subfields: ['Inorganic Chemistry', 'Materials Chemistry', 'Physical Chemistry'],
    keywords: ['ceramic', 'clay', 'glaze', 'kiln', 'refractory', 'glass', 'mineral', 'silicate', 'vitrification', 'thermal'],
    interestIds: ['Art Conservation & Historic Artifacts', 'Nanotechnology & Smart Materials', 'Color, Pigments & Dyes'],
  },
  'Fashion & Sneaker Customization': {
    categories: ['Arts, Design & Sports', 'Engineers', 'Research & Discovery'],
    subfields: ['Materials Chemistry', 'Organic Chemistry', 'Chemical Engineering & Applied'],
    keywords: ['textile', 'fabric', 'apparel', 'dye', 'fiber', 'leather', 'polymer', 'coatings', 'color', 'sneaker', 'wearable'],
    interestIds: ['Color, Pigments & Dyes', 'Plastics, Polymers & Circular Economy', 'Sports Nutrition & Athletic Chemistry'],
  },
  'Jewelry & Metalworking': {
    categories: ['Arts, Design & Sports', 'Engineers', 'Research & Discovery'],
    subfields: ['Inorganic Chemistry', 'Materials Chemistry', 'Analytical Chemistry'],
    keywords: ['metal', 'alloy', 'metallurgy', 'silver', 'gold', 'solder', 'corrosion', 'crystal', 'gem', 'electroplating'],
    interestIds: ['Art Conservation & Historic Artifacts', 'Nanotechnology & Smart Materials', 'Microchips, Semiconductors & Quantum Computing'],
  },

  // 5. Fabrication, Making & Engineering
  'DIY 3D Printing & CAD': {
    categories: ['Engineers', 'Research & Discovery', 'Arts, Design & Sports'],
    subfields: ['Materials Chemistry', 'Chemical Engineering & Applied', 'Physical Chemistry'],
    keywords: ['3d printing', 'polymer', 'materials', 'additive', 'composite', 'cad', 'resin', 'thermoplastic', 'hardware', 'prototype'],
    interestIds: ['Nanotechnology & Smart Materials', 'Plastics, Polymers & Circular Economy', 'Microchips, Semiconductors & Quantum Computing'],
  },
  'Car Mechanics & Karting': {
    categories: ['Engineers', 'Public Safety & Exploration', 'Research & Discovery'],
    subfields: ['Chemical Engineering & Applied', 'Materials Chemistry', 'Physical Chemistry'],
    keywords: ['automotive', 'engine', 'fuel', 'petroleum', 'lubricant', 'combustion', 'battery', 'catalyst', 'vehicle', 'corrosion'],
    interestIds: ['Clean Energy & Battery Tech', 'Aerospace & Rocket Propulsion Fuels', 'Plastics, Polymers & Circular Economy'],
  },
  'Antiques & Vintage Restoration': {
    categories: ['Arts, Design & Sports', 'Public Safety & Exploration', 'Law & Government'],
    subfields: ['Analytical Chemistry', 'Materials Chemistry', 'Inorganic Chemistry'],
    keywords: ['conservation', 'restoration', 'artifact', 'museum', 'antique', 'patina', 'dating', 'wood', 'heritage', 'archaeometry'],
    interestIds: ['Art Conservation & Historic Artifacts', 'Color, Pigments & Dyes', 'Forensic Toxicology & Drug Testing'],
  },

  // 6. Digital, Coding & Tech
  'PC Building & Hardware': {
    categories: ['Engineers', 'Research & Discovery'],
    subfields: ['Materials Chemistry', 'Physical Chemistry', 'Computational Chemistry'],
    keywords: ['hardware', 'silicon', 'thermal', 'semiconductor', 'cooling', 'pc', 'microchip', 'circuit', 'dielectric', 'gpu'],
    interestIds: ['Microchips, Semiconductors & Quantum Computing', 'Nanotechnology & Smart Materials', 'Clean Energy & Battery Tech'],
  },
  'Video Games & Esports': {
    categories: ['Research & Discovery', 'Engineers'],
    subfields: ['Computational Chemistry', 'Physical Chemistry', 'Materials Chemistry'],
    keywords: ['computational', 'simulation', 'in silico', 'algorithm', 'gaming', 'quantum', 'modeling', 'software', 'virtual'],
    interestIds: ['AI & Molecular Simulation', 'Microchips, Semiconductors & Quantum Computing'],
  },
  'Coding & Robotics': {
    categories: ['Engineers', 'Research & Discovery'],
    subfields: ['Computational Chemistry', 'Chemical Engineering & Applied'],
    keywords: ['robotics', 'automation', 'programming', 'code', 'sensor', 'microfluidics', 'arduino', 'high-throughput', 'python'],
    interestIds: ['Robotics & High-Throughput Chemistry', 'AI & Molecular Simulation', 'Microchips, Semiconductors & Quantum Computing'],
  },

  // 7. Athletics & Human Performance
  'Sports & Weightlifting': {
    categories: ['Arts, Design & Sports', 'Health & Medicine', 'Food, Farming & Nature'],
    subfields: ['Biochemistry', 'Organic Chemistry', 'Analytical Chemistry'],
    keywords: ['sport', 'athlete', 'muscle', 'protein', 'nutrition', 'fitness', 'metabolism', 'doping', 'supplement', 'performance'],
    interestIds: ['Sports Nutrition & Athletic Chemistry', 'Anti-Doping & Performance Testing', 'Curing Diseases & Pharma'],
  },
  'Running & Endurance Athletics': {
    categories: ['Arts, Design & Sports', 'Health & Medicine'],
    subfields: ['Biochemistry', 'Analytical Chemistry', 'Physical Chemistry'],
    keywords: ['endurance', 'oxygen', 'cardio', 'metabolism', 'hydration', 'electrolyte', 'lactate', 'marathon', 'sport'],
    interestIds: ['Sports Nutrition & Athletic Chemistry', 'Anti-Doping & Performance Testing', 'Wearables & Smart Medical Devices'],
  },

  // 8. Deduction, Mystery & Strategy
  'True Crime & Forensics Puzzles': {
    categories: ['Public Safety & Exploration', 'Law & Government', 'Research & Discovery'],
    subfields: ['Forensic & Regulatory Chemistry', 'Analytical Chemistry'],
    keywords: ['forensic', 'crime', 'investigation', 'toxicology', 'evidence', 'dna', 'luminol', 'fingerprint', 'trace', 'detective', 'narcotics'],
    interestIds: ['Crime Scene & Forensic Chemistry', 'Forensic Toxicology & Drug Testing', 'Consumer Safety & Toxic Prevention'],
  },
  'Chess & Strategy Board Games': {
    categories: ['Research & Discovery', 'Law & Government', 'Public Safety & Exploration'],
    subfields: ['Computational Chemistry', 'Analytical Chemistry', 'Forensic & Regulatory Chemistry'],
    keywords: ['strategy', 'logic', 'puzzle', 'deduction', 'matrix', 'synthesis', 'retrosynthesis', 'algorithm', 'decision', 'analysis'],
    interestIds: ['AI & Molecular Simulation', 'Crime Scene & Forensic Chemistry', 'Patent Law & Tech Commercialization'],
  },

  // 9. Optics, Space & Audio
  'Photography & Darkroom': {
    categories: ['Arts, Design & Sports', 'Research & Discovery', 'Engineers'],
    subfields: ['Physical Chemistry', 'Inorganic Chemistry', 'Materials Chemistry'],
    keywords: ['photo', 'film', 'darkroom', 'optics', 'lens', 'sensor', 'photochemistry', 'spectroscopy', 'light', 'laser'],
    interestIds: ['Color, Pigments & Dyes', 'Microchips, Semiconductors & Quantum Computing', 'Space, Planetary Science & Astrochemistry'],
  },
  'Astronomy & Stargazing': {
    categories: ['Research & Discovery', 'Public Safety & Exploration'],
    subfields: ['Physical Chemistry', 'Inorganic Chemistry', 'Computational Chemistry'],
    keywords: ['astrochemist', 'space', 'astronomy', 'planet', 'mars', 'telescope', 'stellar', 'spectroscopy', 'nebula', 'interstellar'],
    interestIds: ['Space, Planetary Science & Astrochemistry', 'Microchips, Semiconductors & Quantum Computing'],
  },
  'Music Production & Synthesizers': {
    categories: ['Arts, Design & Sports', 'Engineers', 'Research & Discovery'],
    subfields: ['Physical Chemistry', 'Materials Chemistry', 'Computational Chemistry'],
    keywords: ['audio', 'sound', 'acoustics', 'music', 'frequency', 'hardware', 'electronics', 'signal', 'synthesizer'],
    interestIds: ['Microchips, Semiconductors & Quantum Computing', 'Nanotechnology & Smart Materials'],
  },

  // 10. Discourse, Writing & Leadership
  'Creative Writing & Science Media': {
    categories: ['Business, Media & Education', 'Law & Government'],
    subfields: ['Forensic & Regulatory Chemistry', 'Environmental Chemistry'],
    keywords: ['communication', 'journalism', 'writing', 'media', 'educator', 'teach', 'science writer', 'outreach', 'publishing'],
    interestIds: ['Teaching & Science Communication', 'Patent Law & Tech Commercialization', 'Government Policy & EPA Regulation'],
  },
  'Speech, Debate & Model UN': {
    categories: ['Law & Government', 'Business, Media & Education'],
    subfields: ['Forensic & Regulatory Chemistry', 'Environmental Chemistry'],
    keywords: ['law', 'policy', 'patent', 'regulation', 'government', 'ethics', 'treaty', 'debate', 'advocacy', 'compliance'],
    interestIds: ['Patent Law & Tech Commercialization', 'Government Policy & EPA Regulation', 'Teaching & Science Communication'],
  },
};

export function calculateCareerMatches(
  profile: StudentProfile,
  allCareers: Career[] = CAREERS_80
): MatchResult[] {
  return allCareers.map((career) => {
    let rawScore = 0;
    let maxPossible = 0;
    const reasons: string[] = [];
    const matchedSubjects: string[] = [];
    const matchedInterests: string[] = [];
    const matchedHobbies: string[] = [];

    // 1. Subject Alignment (Weight: 35 points)
    if (profile.selectedSubjects.length > 0) {
      maxPossible += 35;
      let subjectMatches = 0;
      profile.selectedSubjects.forEach((sub) => {
        if (career.favoriteSubjects.includes(sub)) {
          subjectMatches++;
          matchedSubjects.push(sub);
        }
      });

      if (subjectMatches > 0) {
        const subScore = Math.min(35, (subjectMatches / Math.max(1, Math.min(3, profile.selectedSubjects.length))) * 35);
        rawScore += subScore;
        reasons.push(`Strong overlap with your favorite academic disciplines: ${matchedSubjects.join(', ')}.`);
      }
    }

    // 2. Interest Alignment (Weight: 35 points)
    if (profile.selectedInterests.length > 0) {
      maxPossible += 35;
      let interestMatches = 0;
      profile.selectedInterests.forEach((interest) => {
        if (career.interests.includes(interest)) {
          interestMatches++;
          matchedInterests.push(interest);
        }
      });

      if (interestMatches > 0) {
        const intScore = Math.min(35, (interestMatches / Math.max(1, Math.min(2, profile.selectedInterests.length))) * 35);
        rawScore += intScore;
        reasons.push(`Directly connects with your passion for ${matchedInterests.join(' & ')}.`);
      }
    }

    // 3. Hobby Alignment (Weight: 20 points)
    if (profile.selectedHobbies && profile.selectedHobbies.length > 0) {
      maxPossible += 20;
      let hobbyMatches = 0;

      const careerText = `${career.title} ${career.description} ${career.tagline} ${career.dayInTheLife} ${career.topSkills.join(' ')} ${career.category}`.toLowerCase();

      profile.selectedHobbies.forEach((hobbyId) => {
        const mapping = HOBBY_CAREER_MAP[hobbyId];
        let hasMatch = false;

        if (mapping) {
          // Check category overlap
          if (mapping.categories?.includes(career.category)) {
            hasMatch = true;
          }
          // Check subfield overlap
          if (mapping.subfields?.includes(career.chemistrySubfield)) {
            hasMatch = true;
          }
          // Check interest IDs overlap
          if (mapping.interestIds?.some((iid) => career.interests.includes(iid))) {
            hasMatch = true;
          }
          // Check keyword overlap in career content
          if (mapping.keywords?.some((kw) => careerText.includes(kw))) {
            hasMatch = true;
          }
        }

        if (hasMatch) {
          hobbyMatches++;
          matchedHobbies.push(hobbyId);
        }
      });

      if (hobbyMatches > 0) {
        const hobbyScore = Math.min(20, (hobbyMatches / Math.max(1, Math.min(2, profile.selectedHobbies.length))) * 20);
        rawScore += hobbyScore;
        reasons.push(`Channels your real-world hobbies & creative interests (${matchedHobbies.join(', ')}) into daily laboratory applications.`);
      }
    }

    // 4. Work Environment Preference (Weight: 10 points)
    if (profile.workEnvPreference && profile.workEnvPreference !== 'Any / No Preference') {
      maxPossible += 10;
      if (career.workEnvironment.toLowerCase().includes(profile.workEnvPreference.toLowerCase()) ||
          profile.workEnvPreference.toLowerCase().includes(career.workEnvironment.toLowerCase())) {
        rawScore += 10;
        reasons.push(`Matches your preferred workplace setting (${career.workEnvironment}).`);
      } else {
        rawScore += 3; // partial credit
      }
    }

    // Baseline calculation
    const finalScore = maxPossible > 0 ? Math.min(99, Math.max(30, Math.round((rawScore / maxPossible) * 100))) : 75;

    return {
      career: {
        ...career,
        matchScore: finalScore,
        matchReasons: reasons,
      },
      score: finalScore,
      matchedSubjects,
      matchedInterests,
      matchedHobbies,
      reasons,
    };
  }).sort((a, b) => b.score - a.score || a.career.number - b.career.number);
}
