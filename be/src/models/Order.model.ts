type Order = {
  userId: string;
  orderDate: Date;
  shippingDate: Date;
  shippingAddress: {
    name: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    address: string;
  };
  paymentMethod: "cash";
  items: {
    productId: string;
    quantity: number;
    size: string;
    price: number;
  }[];
  note?: string;
  status: "pending" | "accepted" | "shipping" | "delivered" | "cancelled";
  cancelledReason?: string;
  createdAt: Date;
  updatedAt: Date;
};

export default Order;

export type OrderWithIdString = Order & {
  _id: string;
};
