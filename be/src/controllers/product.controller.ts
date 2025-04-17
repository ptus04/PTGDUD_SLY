import { Request, Response } from "express";
import productService from "../services/product.service";
import { matchedData, validationResult } from "express-validator";

export const getProducts = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const isNew = Boolean(req.query.isNew);

  const products = await productService.getAllProducts(limit, isNew);
  if (!products || products.length === 0) {
    res.status(404).json({ message: "No products found" });
    return;
  }

  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const data = matchedData<{ pid: string }>(req);
  const product = await productService.getProductById(data.pid);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.status(200).json(product);
};
