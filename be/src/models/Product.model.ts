import { Filter, WithId } from "mongodb";
import db from "../database";

export interface Product {
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

export default class ProductModel {
  static async find(
    filter: Filter<Product>,
    limit?: number
  ): Promise<ProductWithId[]> {
    return await db()
      .collection<Product>("products")
      .find(filter)
      .limit(limit ?? 0)
      .toArray();
  }

  static async findOne(filter: Filter<Product>) {
    return await db().collection<Product>("products").findOne(filter);
  }

  static async findCarouselItems(orientation: "landscape" | "portrait") {
    return await db()
      .collection<Product>("carousel")
      .find({ orientation })
      .toArray();
  }
}
