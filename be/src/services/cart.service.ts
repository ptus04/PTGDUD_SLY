import { ObjectId } from "mongodb";
import db from "../database";
import Cart from "../models/Cart.model";

const getCartItems = (userId: string) => {
  return db()
    .collection<Cart>("carts")
    .findOne({ _id: new ObjectId(userId) });
};

const updateCartItems = (userId: string, items: Cart["items"]) => {
  return db()
    .collection<Cart>("carts")
    .updateOne(
      { _id: new ObjectId(userId) },
      { $set: { _id: new ObjectId(userId), items: items, updatedAt: new Date() } },
      { upsert: true },
    );
};

export default { getCartItems, updateCartItems } as const;
