export type Category = {
  id: number;
  name: string;
  icon: string;
  link: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  year: string;
  image: string;
  description: string;
  category: string;
  features: string[];
  seller: {
    name: string;
    contact: string;
    email: string;
    address: string;
  };
};

export type brand = {
  id: number;
  name: string;
  image: string;
};
