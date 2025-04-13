import { ObjectId } from "mongodb";
import { db } from "../configs/db";
import Product from "../types/Product";

const getAllProducts = async (limit: number) => {
  const products = await db()
    .collection<Product>("products")
    .find()
    .limit(limit)
    .toArray();
  return products;
};

const getNewProducts = async (limit: number) => {
  const products = await db()
    .collection<Product>("products")
    .find({ isNew: true })
    .sort({ updatedAt: -1 })
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
  getNewProducts,
  getProductById,
};
