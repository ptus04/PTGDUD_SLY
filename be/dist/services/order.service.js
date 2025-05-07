"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("../database"));
const getOrders = (userId) => {
    return (0, database_1.default)().collection("orders").find({ userId }).sort({ createdAt: -1 }).toArray();
};
const getAllOrders = () => {
    return (0, database_1.default)().collection("orders").find({}).sort({ createdAt: -1 }).toArray();
};
const getOrder = (orderId) => {
    return (0, database_1.default)()
        .collection("orders")
        .findOne({ _id: new mongodb_1.ObjectId(orderId) });
};
const createOrder = (order) => {
    order.status = "pending";
    order.createdAt = new Date();
    order.updatedAt = new Date();
    return (0, database_1.default)().collection("orders").insertOne(order);
};
const cancelOrder = (orderId, userId, reason) => {
    return (0, database_1.default)()
        .collection("orders")
        .updateOne({ _id: new mongodb_1.ObjectId(orderId), userId, status: "pending" }, {
        $set: {
            status: "cancelled",
            cancelledReason: reason,
            updatedAt: new Date(),
        },
    });
};
const getOrdersWithDetails = async (userId) => {
    const orders = await (0, database_1.default)().collection("orders").find({ userId }).sort({ createdAt: -1 }).toArray();
    const userIds = [...new Set(orders.map((order) => order.userId))];
    const productIds = [...new Set(orders.flatMap((order) => order.items.map((item) => item.productId)))];
    const users = await (0, database_1.default)()
        .collection("users")
        .find({ _id: { $in: userIds.map((id) => new mongodb_1.ObjectId(id)) } })
        .toArray();
    const products = await (0, database_1.default)()
        .collection("products")
        .find({ _id: { $in: productIds.map((id) => new mongodb_1.ObjectId(id)) } })
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
exports.default = { getOrders, getOrdersWithDetails, getAllOrders, getOrder, createOrder, cancelOrder };
