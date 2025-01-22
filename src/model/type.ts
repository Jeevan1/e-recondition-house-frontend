export type Category = {
  idx: string;
  name: string;
  icon?: string;
  link?: string;
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

export type ReconditionHouse = {
  idx: string;
  name: string;
  telephone_number: number;
  address: string;
  email: string;
  contact_number: number;
  vat_registration_number: string;
  vat_registration_documentImage: File;
  pan_registration_number: string;
  pan_registration_documentImage: File;
  tax_compliance_documentImage: File;
  logo: string;
  website_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  instagram_url?: string;
};

export type Product = {
  idx: string;
  name: string;
  description: string;
  category: Category;
  recondition_house: ReconditionHouse;
  color: string;
  model: string;
  year_of_manufacture: string;
  mileage: number;
  actual_price: number;
  discounted_price: number;
  fuel_type: string;
  transmission: string;
  seating_capicity: number;
  engine_capacity: number;
  featured_image: string;
  features: string[];
  accident_history: boolean;
  bill_book_upto_date: boolean;
  lot: string;
  vehicle_registration_number: string;
  images: {
    image: string;
    idx: string;
  }[];
  km_driven: number;
  brand?: brand;
  contact_number?: number;
  location?: string;
  tags: string[];
};

export type Column = {
  header?: string;
  accessorKey: string;
};

export type RegisterFormProps = {
  idx: string;
  name: string;
  email: string;
  password: string;
  telephone_number: string;
  address: string;
  contact_number: string;
  vat_registration_number: string;
  pan_registration_number: string;
  website_url: string;
  facebook_url: string;
  tiktok_url: string;
  instagram_url: string;
  logo: File;
  username: string;
  confirmPassword: string;
  vat_registration_document_image: File;
  pan_registration_document_image: File;
  tax_compliance_document_image: File;
};
