import { ObjectId } from "mongodb";
import db from "../database";
import Product from "../models/Product.model";

const getProducts = (limit: number, isNew: boolean, category?: string, query?: string) => {
  return db()
    .collection<Product>("products")
    .find({
      ...(isNew ? { isNew: true } : {}),
      ...(category ? { category } : {}),
      ...(query ? { title: { $regex: new RegExp(query, "i") } } : {}),
    })
    .limit(limit ?? 10)
    .toArray();
};

const getProductById = (productId: string) =>
  db()
    .collection<Product>("products")
    .findOne({ _id: new ObjectId(productId) });

const getCarouselItems = (orientation: "landscape" | "portrait") =>
  db().collection<Product>("carousel").find({ orientation }).toArray();

export default { getProducts, getProductById, getCarouselItems } as const;
