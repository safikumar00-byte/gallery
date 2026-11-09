export type CardAspectRatio = 'square' | 'portrait' | 'tall' | 'landscape' | 'wide' | 'cutout';

export type ProjectCategory = 
  | 'All'
  | '3D & Motion'
  | 'Brand Identity'
  | 'Digital Product'
  | 'Editorial & Poster'
  | 'Fintech & Systems';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  aspectRatio: CardAspectRatio;
  columnSpan?: number;
  featured?: boolean;
  isCutout?: boolean;
  badge?: string;
  liveUrl?: string;
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics?: { label: string; value: string }[];
  technologies: string[];
  credits?: string;
}
