export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack & AI' | '3D & Social Commerce' | 'Conversational AI' | 'Core Systems';
  team?: string;
  headline: string;
  description: string;
  keyFeatures: string[];
  technologies: string[];
  goal: string;
  badge?: string;
  metrics?: { label: string; value: string }[];
  accentColor: string;
  baseImage: string;
  secondaryImage?: string;
  secondaryTag?: string;
  loyaltySystem?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  theme: string;
  prize?: string;
  award: string;
  date: string;
  description: string;
  highlight?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  department: string;
  focus: string;
  responsibilities: string[];
  skillsDeveloped: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface EducationInfo {
  degree: string;
  specialization: string;
  university: string;
  location: string;
  duration: string;
  status: string;
  sgpa: string;
  areas: string[];
}
