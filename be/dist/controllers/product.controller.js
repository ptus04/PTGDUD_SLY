"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getCarouselItems = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const product_service_1 = __importDefault(require("../services/product.service"));
const getProducts = async (req, res) => {
    const data = (0, express_validator_1.matchedData)(req, {
        onlyValidData: true,
    });
    const limit = data.limit ?? 10;
    const isNew = data.isNew;
    const category = data.category;
    const query = data.query ?? undefined;
    const products = await product_service_1.default.getProducts(limit, isNew, category, query);
    if (products.length === 0) {
        res.status(404).json({ error: "No products found" });
        return;
    }
    res.status(200).json(products);
};
exports.getProducts = getProducts;
const getCarouselItems = async (req, res) => {
    const data = (0, express_validator_1.matchedData)(req);
    const items = await product_service_1.default.getCarouselItems(data.orientation);
    res.status(200).json(items);
};
exports.getCarouselItems = getCarouselItems;
const getProduct = async (req, res) => {
    const data = (0, express_validator_1.matchedData)(req);
    const product = await product_service_1.default.getProductById(data.id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    res.status(200).json(product);
};
exports.getProduct = getProduct;
