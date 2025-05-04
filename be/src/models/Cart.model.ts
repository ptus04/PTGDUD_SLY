import { ObjectId } from "mongodb";

type Cart = {
  _id: ObjectId;
  items: {
    _id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
  }[];
  updatedAt: Date;
};

export default Cart;
