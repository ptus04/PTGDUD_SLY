import { ObjectId } from "mongodb";
import { db } from "../configs/db";
import Product from "../types/Product";

const getAllProducts = async (limit: number, isNew: boolean) => {
  const query = isNew ? { isNew: true } : {};
  const products = await db()
    .collection<Product>("products")
    .find(query)
    .limit(limit)
    .toArray();
  return products;
};

const getProductById = async (pid: string) => {
  const product = await db()
    .collection<Product>("products")
    .findOne({ _id: new ObjectId(pid) });
  return product;
};

export default {
  getAllProducts,
  getProductById,
};
