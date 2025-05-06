import { ObjectId } from "mongodb";
import db from "../database";
import Order from "../models/Order.model";

const getOrders = (userId: string) => {
  return db().collection<Order>("orders").find({ userId }).sort({ createdAt: -1 }).toArray();
};

const getOrder = (orderId: string) => {
  return db()
    .collection<Order>("orders")
    .findOne({ _id: new ObjectId(orderId) });
};

const createOrder = (order: Order) => {
  order.status = "pending";
  order.createdAt = new Date();
  order.updatedAt = new Date();
  return db().collection<Order>("orders").insertOne(order);
};

const cancelOrder = (orderId: string, reason: string) => {
  return db()
    .collection<Order>("orders")
    .updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: "cancelled",
          cancelledReason: reason,
        },
      },
    );
};

export default { getOrders, getOrder, createOrder, cancelOrder } as const;
