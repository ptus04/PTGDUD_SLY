type Product = {
  category: string[];
  title: string;
  price: number;
  images: string[];
  discount?: number;
  size?: string[];
  description: string[];
  careInstructions: string[];
  inStock: number;
  isNew?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductWithIdString = Product & {
  _id: string;
};

export default Product;
