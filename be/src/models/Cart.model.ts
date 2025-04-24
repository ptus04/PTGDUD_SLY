import { ObjectId } from "mongodb";
import CartItem from "./CartItem.model";

type Cart = {
  _id: ObjectId;
  items: CartItem[];
};

export default Cart;
