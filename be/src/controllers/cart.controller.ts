import { Request, Response } from "express";
import { matchedData } from "express-validator";
import CartItem from "../models/CartItem.model";
import cartService from "../services/cart.service";

export const getCart = async (req: Request, res: Response) => {
  const userId = req._id;
  const items = await cartService.getCartItems(userId);
  res.status(200).json(items);
};

export const updateCart = async (req: Request, res: Response) => {
  const userId = req._id;
  const items = matchedData<{ items: CartItem[] }>(req).items;

  const result = await cartService.updateCartItems(userId, items);
  if (!result) {
    res.status(500).json({ message: "Failed to update cart" });
    return;
  }

  res.status(200).end();
};
