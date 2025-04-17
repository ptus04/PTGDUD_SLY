import { ObjectId } from "mongodb";
import ProductModel from "../models/Product.model";

export const getAllProducts = async (limit: number, isNew: boolean) =>
  await ProductModel.find(isNew ? { isNew: true } : {}, limit);

export const getCarouselItems = async (orientation: "landscape" | "portrait") =>
  await ProductModel.findCarouselItems(orientation);

export const getProductById = async (pid: string) =>
  await ProductModel.findOne({ _id: new ObjectId(pid) });
