import { ObjectId } from "mongodb";
import db from "../database";
import Product from "../models/Product.model";

const getAllProducts = (limit: number, isNew: boolean) =>
  db()
    .collection<Product>("products")
    .find(isNew ? { isNew: true } : {})
    .limit(limit ?? 10)
    .toArray();

const getProductById = (productId: string) =>
  db()
    .collection<Product>("products")
    .findOne({ _id: new ObjectId(productId) });

const getCarouselItems = (orientation: "landscape" | "portrait") =>
  db().collection<Product>("carousel").find({ orientation }).toArray();

export default { getAllProducts, getProductById, getCarouselItems } as const;
