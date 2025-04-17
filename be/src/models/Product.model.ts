import { WithId } from "mongodb";

export default interface Product {
  category: string[];
  title: string;
  price: number;
  images: string[];
  discount: number;
  size: string[];
  description: string[];
  careInstructions: string[];
  inStock: number;
  isNew?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type ProductWithId = WithId<Product>;
