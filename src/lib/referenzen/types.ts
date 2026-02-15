export type Trade =
  | "elektrotechnik"
  | "sanitaer-heizung"
  | "innenausbau"
  | "reinigung"
  | "facility";

export type ObjectType =
  | "Hausverwaltung"
  | "Gewerbe"
  | "Privat"
  | "Industrie"
  | "Öffentlich";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  text: string;
  author: string;
  source?: string;
  date?: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  location: string;
  objectType: ObjectType;
  trades: Trade[];
  services: string[];
  excerpt: string;
  coverImage: string;
  gallery: string[];
  metrics?: ProjectMetric[];
  scope?: string[];
  documentation?: string[];
  testimonial?: ProjectTestimonial;
  year?: string;
  featured?: boolean;
}
