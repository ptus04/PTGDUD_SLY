import { Request, Response } from "express";
import productService from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const isNew = req.query.isNew === "true" ? true : false;

  try {
    const products = await productService.getAllProducts(limit, isNew);
    if (!products) {
      res.status(404).json(products);
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const pid = req.params.pid;
  if (!pid) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  try {
    const product = await productService.getProductById(pid);
    if (!product) {
      res.status(404).json(product);
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
