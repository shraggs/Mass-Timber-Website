export interface Contractor {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
  phone?: string;
  rating: number;
  reviewCount: number;
  badges: ('featured' | 'popular')[];
  image?: string;
  categories: string[];
  location?: string;
  lat?: number | null;
  lng?: number | null;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string;
  image?: string;
  description?: string;
}

export interface Supplier {
  id: string;
  name: string;
  slug: string;
  location: string;
  categories: string[];
  image?: string;
  description?: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  projectCount: number;
  image?: string;
}

export interface LocationCardType {
  id: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}
