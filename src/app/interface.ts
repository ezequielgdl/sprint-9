export interface Member {
  name: string;
  title: string;
  role: string;
  avatar?: string;
}

export interface Evento {
  title: string;
  subtitle?: string;
  year?: number;
  description: string;
  url?: string;
  picture?: string;
  category: string;
}
