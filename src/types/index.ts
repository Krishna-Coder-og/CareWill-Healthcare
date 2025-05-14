export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  availability: string[];
  position: {
    lat: number;
    lng: number;
  };
  distance?: number;
  image?: string;
}

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'article' | 'video' | 'form';
  url: string;
  categoryId: string;
  tags: string[];
  date: Date;
  thumbnail?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}