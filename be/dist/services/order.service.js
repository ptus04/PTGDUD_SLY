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
exports.default = { getOrders, getOrder, createOrder, cancelOrder };
