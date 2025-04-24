import { ObjectId } from "mongodb";
import db from "../database";
import Cart from "../models/Cart.model";
import CartItem from "../models/CartItem.model";

const getCartItems = async (userId: string) => {
  const cart = await db()
    .collection<Cart>("carts")
    .findOne({ _id: new ObjectId(userId) });

  return cart ? cart.items : [];
};

const updateCartItems = async (userId: string, items: CartItem[]) => {
  const result = await db()
    .collection<Cart>("carts")
    .updateOne({ _id: new ObjectId(userId) }, { $set: { items } });

  return result.matchedCount > 0 && result.modifiedCount > 0;
};

export default { getCartItems, updateCartItems } as const;
