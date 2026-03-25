
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
}
