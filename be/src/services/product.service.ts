import { ObjectId } from "mongodb";
import ProductModel from "../models/Product.model";

const getAllProducts = async (limit: number, isNew: boolean) =>
  await ProductModel.find(isNew ? { isNew: true } : {}, limit);

const getProductById = async (pid: string) =>
  await ProductModel.findOne({ _id: new ObjectId(pid) });

export default { getAllProducts, getProductById };
