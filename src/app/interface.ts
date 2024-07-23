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
  date?: string;
  description: string;
  picture?: string;
  category: string;
}
