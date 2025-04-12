import { Request, Response } from "express";
import { getAllProducts, getProductById } from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const products = await getAllProducts(limit);

    if (!products) {
      res.status(404).json(products);
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (!productId) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  try {
    const product = await getProductById(productId);

    if (!product) {
      res.status(404).json(product);
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
