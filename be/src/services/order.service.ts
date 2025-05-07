import { ObjectId } from "mongodb";
import db from "../database";
import Order from "../models/Order.model";
import Product from "../models/Product.model";
import User from "../models/User.model";

const getOrders = (userId: string) => {
  return db().collection<Order>("orders").find({ userId }).sort({ createdAt: -1 }).toArray();
};
const getAllOrders = () => {
  return db().collection<Order>("orders").find({}).sort({ createdAt: -1 }).toArray();
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

const cancelOrder = (orderId: string, userId: string, reason: string) => {
  return db()
    .collection<Order>("orders")
    .updateOne(
      { _id: new ObjectId(orderId), userId, status: "pending" },
      {
        $set: {
          status: "cancelled",
          cancelledReason: reason,
          updatedAt: new Date(),
        },
      },
    );
};

const getOrdersWithDetails = async (userId: string) => {
  const orders = await db().collection<Order>("orders").find({ userId }).sort({ createdAt: -1 }).toArray();

  const userIds = [...new Set(orders.map((order) => order.userId))];
  const productIds = [...new Set(orders.flatMap((order) => order.items.map((item) => item.productId)))];

  const users = await db()
    .collection<User>("users")
    .find({ _id: { $in: userIds.map((id) => new ObjectId(id)) } })
    .toArray();

  const products = await db()
    .collection<Product>("products")
    .find({ _id: { $in: productIds.map((id) => new ObjectId(id)) } })
    .toArray();

  const userMap = Object.fromEntries(users.map((user) => [user._id.toString(), user.name]));
  const productMap = Object.fromEntries(products.map((product) => [product._id.toString(), product.title]));

  return orders.map((order) => ({
    ...order,
    userName: userMap[order.userId],
    items: order.items.map((item) => ({
      ...item,
      productName: productMap[item.productId],
    })),
  }));
};

export default { getOrders, getOrdersWithDetails, getAllOrders, getOrder, createOrder, cancelOrder } as const;
