export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  // description: string;
  achievements: string[];
  logoInitials: string;
  techStack: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  // details: string;
  type: "master" | "bachelor";
  courses: string[];
  location: string;
  badge: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "design";
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
