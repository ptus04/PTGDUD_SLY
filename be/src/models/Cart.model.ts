
type Cart = {
  items: {
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
  }[];
  updatedAt: Date;
};

export type CartWithIdString = Cart & {
  _id: string;
};

export default Cart;
