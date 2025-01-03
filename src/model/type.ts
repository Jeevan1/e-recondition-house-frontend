export type Category = {
  id: number;
  name: string;
  icon: string;
  link: string;
};

export type Rating = {
  id: number;
  name: string;
  stars: number;
  review: string;
  upload_time: string;
  images: string[];
};

export type Seller = {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: string;
  rating?: Rating[];
};

export type brand = {
  id: number;
  name: string;
  image: string;
};
export type Product = {
  id: number;
  name: string;
  price: number;
  color: string;
  engine_capacity: string;
  transmission: string;
  fuel: string;
  mileage: number;
  seat_capicity: number;
  lot: string;
  number_plate: string;
  buy_year: string;
  year: string;
  image: string[];
  km_driven: number;
  description: string;
  category: string;
  features: string[];
  seller?: Seller;
  brand?: brand;
};

export type ReconditionHouse = {
  name: string;
  telephoneNumber: number;
  address: string;
  email?: string;
  contactNumber: number;
  vatRegistrationNumber: string;
  vatRegistrationDocumentImage: File;
  panRegistrationNumber: string;
  panRegistrationDocumentImage: File;
  taxComplianceDocumentImage: File;
  logo: File;
  websiteUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
};
