import { Request, Response } from "express";
import { matchedData } from "express-validator";
import productService from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  const data = matchedData<{ limit: number; isNew: boolean; category: string | undefined; query: string | undefined }>(
    req,
    {
      onlyValidData: true,
    },
  );
  const limit = data.limit ?? 10;
  const isNew = data.isNew;
  const category = data.category;
  const query = data.query ?? undefined;

  const products = await productService.getProducts(limit, isNew, category, query);
  if (products.length === 0) {
    res.status(404).json({ error: "No products found" });
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
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.status(200).json(product);
};
