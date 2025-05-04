import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Cart from "../models/Cart.model";
import cartService from "../services/cart.service";

export const getCart = async (req: Request, res: Response) => {
  const userId = req._id;
  const cart = await cartService.getCartItems(userId);
  if (!cart) {
    res.status(200).json({ _id: new ObjectId(userId), items: [], updatedAt: new Date("1970-01-01") } as Cart);
    return;
  }

  res.status(200).json(cart);
};

export const updateCart = async (req: Request, res: Response) => {
  const userId = req._id;
  const items = req.body as Cart["items"];

  const result = await cartService.updateCartItems(userId, items);
  if (!result) {
    res.status(500).json({ message: "Failed to update cart" });
    return;
  }

  res.status(200).json({ message: "Cart updated successfully" });
};
