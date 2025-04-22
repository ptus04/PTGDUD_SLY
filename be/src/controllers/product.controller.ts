import { Request, Response } from "express";
import { matchedData } from "express-validator";
import productService from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const isNew = Boolean(req.query.isNew);

  const products = await productService.getAllProducts(limit, isNew);
  if (products.length === 0) {
    res.status(404).end();
    return;
  }

  res.status(200).json(products);
};

export const getCarouselItems = async (req: Request, res: Response) => {
  const data = matchedData<{ orientation: "landscape" | "portrait" }>(req);
  const items = await productService.getCarouselItems(data.orientation);
  res.status(200).json(items);
};

export const getProduct = async (req: Request, res: Response) => {
  const data = matchedData<{ id: string }>(req);
  const product = await productService.getProductById(data.id);

  if (!product) {
    res.status(404).end();
    return;
  }

  res.status(200).json(product);
};
