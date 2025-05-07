"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.createOrder = exports.getOrder = exports.getOrders = void 0;
const order_service_1 = __importDefault(require("../services/order.service"));
const express_validator_1 = require("express-validator");
const getOrders = async (req, res) => {
    const userId = req._id;
    try {
        const orders = await order_service_1.default.getOrders(userId);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrders = getOrders;
const getOrder = async (req, res) => {
    const userId = req._id;
    const data = (0, express_validator_1.matchedData)(req);
    const orderId = data.orderId;
    try {
        const order = await order_service_1.default.getOrder(orderId);
        if (!order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }
        if (order.userId !== userId) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrder = getOrder;
const createOrder = async (req, res) => {
    const userId = req._id;
    const order = req.body;
    try {
        const result = await order_service_1.default.createOrder({ ...order, userId });
        res.status(201).json({ orderId: result.insertedId });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createOrder = createOrder;
const cancelOrder = async (req, res) => {
    const userId = req._id;
    const data = (0, express_validator_1.matchedData)(req);
    const orderId = data.orderId;
    const reason = data.reason;
    try {
        const result = await order_service_1.default.cancelOrder(orderId, userId, reason);
        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Order not found or already cancelled" });
            return;
        }
        res.status(200).json({ message: "Order cancelled successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.cancelOrder = cancelOrder;
