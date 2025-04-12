import { db } from "../configs/db";

export const getAllProducts = async (limit: number) => {
  const products = await db()
    .collection("products")
    .find()
    .limit(limit)
    .toArray();
  return products;
};

export const getProductById = async (id: number) => {
  const product = await db().collection("products").findOne({ id });
  return product;
};
