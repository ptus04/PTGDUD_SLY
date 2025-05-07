"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCart = exports.getCart = void 0;
const mongodb_1 = require("mongodb");
const cart_service_1 = __importDefault(require("../services/cart.service"));
const getCart = async (req, res) => {
    const userId = req._id;
    const cart = await cart_service_1.default.getCartItems(userId);
    if (!cart) {
        res.status(200).json({ _id: new mongodb_1.ObjectId(userId), items: [], updatedAt: new Date("1970-01-01") });
        return;
    }
    res.status(200).json(cart);
};
exports.getCart = getCart;
const updateCart = async (req, res) => {
    const userId = req._id;
    const items = req.body;
    const result = await cart_service_1.default.updateCartItems(userId, items);
    if (!result) {
        res.status(500).json({ message: "Failed to update cart" });
        return;
    }
    res.status(200).json({ message: "Cart updated successfully" });
};
exports.updateCart = updateCart;
