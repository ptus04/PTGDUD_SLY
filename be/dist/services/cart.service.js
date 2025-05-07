"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("../database"));
const getCartItems = (userId) => {
    return (0, database_1.default)()
        .collection("carts")
        .findOne({ _id: new mongodb_1.ObjectId(userId) });
};
const updateCartItems = (userId, items) => {
    return (0, database_1.default)()
        .collection("carts")
        .updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: { _id: new mongodb_1.ObjectId(userId), items: items, updatedAt: new Date() } }, { upsert: true });
};
exports.default = { getCartItems, updateCartItems };
