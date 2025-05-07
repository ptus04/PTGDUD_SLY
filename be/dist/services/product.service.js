"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("../database"));
const getProducts = (limit, isNew, category, query) => {
    return (0, database_1.default)()
        .collection("products")
        .find({
        ...(isNew ? { isNew: true } : {}),
        ...(category ? { category } : {}),
        ...(query ? { title: { $regex: new RegExp(query, "i") } } : {}),
    })
        .limit(limit ?? 10)
        .toArray();
};
const getProductById = (productId) => (0, database_1.default)()
    .collection("products")
    .findOne({ _id: new mongodb_1.ObjectId(productId) });
const getCarouselItems = (orientation) => (0, database_1.default)().collection("carousel").find({ orientation }).toArray();
exports.default = { getProducts, getProductById, getCarouselItems };
