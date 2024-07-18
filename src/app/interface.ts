export interface Member {
  name: string;
  title: string;
  role: string;
  avatar?: string;
  linkedin?: string;
  category?: string[];
}

export interface Evento {
  title: string;
  subtitle?: string;
  year?: number;
  description: string;
  picture?: string;
  category: string;
}
