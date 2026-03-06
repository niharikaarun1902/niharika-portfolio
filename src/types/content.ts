export interface Profile {
  name: string;
  pronouns: string;
  headline: string;
  tagline: string;
  summary: string;
  location: string;
  linkedin: string;
  email: string;
  avatar: string;
  _todo?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
  skills: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  color: "blue" | "orange" | "pink" | "mint" | "lavender";
  tech: string[];
  problem: string;
  approach: string;
  approachBullets?: string[];
  stack: string[];
  results: string[];
  links: { label: string; url: string }[];
  systemDesign?: string;
  nextSteps?: string[];
  _todo?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  logo: string;
  _todo?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string | null;
  credentialUrl: string;
  _todo?: string[];
}

export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  images?: string[];
  _todo?: boolean;
}

export interface HeroCallout {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  direction: "left" | "right";
}

export interface StoryPanel {
  heading: string;
  text: string;
}

export interface Story {
  id: string;
  title: string;
  panels: StoryPanel[];
  narrative: string;
  fix: string[];
  impact: string[];
}

export type TimelineEntry = {
  date: string;
  sortKey: number;
  type: "work" | "education" | "certification";
  title: string;
  subtitle: string;
  description?: string;
  skills?: string[];
};

export const COLOR_MAP: Record<string, string> = {
  blue: "var(--color-pastel-blue)",
  orange: "var(--color-pastel-orange)",
  pink: "var(--color-pastel-pink)",
  mint: "var(--color-pastel-mint)",
  lavender: "var(--color-pastel-lavender)",
};
