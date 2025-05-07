"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_controller_1 = require("../controllers/product.controller");
const handleBadRequest_1 = __importDefault(require("../utils/handleBadRequest"));
const getProductsValidator = [
    (0, express_validator_1.query)("limit").optional().isInt({ min: 1 }).withMessage("Limit must be a positive integer").toInt(),
    (0, express_validator_1.query)("isNew").optional().isBoolean().withMessage("isNew must be a boolean").toBoolean(),
    (0, express_validator_1.query)("category").optional().notEmpty().withMessage("Category is required"),
    (0, express_validator_1.query)("query").optional().notEmpty().withMessage("Query is required"),
];
const getProductValidator = [(0, express_validator_1.param)("id").notEmpty().isMongoId().withMessage("Invalid product ID")];
const getCarouselItemsValidator = [
    (0, express_validator_1.query)("orientation").isIn(["landscape", "portrait"]).withMessage("Invalid orientation"),
];
const router = (0, express_1.Router)();
router.get("/", getProductsValidator, handleBadRequest_1.default, product_controller_1.getProducts);
router.get("/carousel", getCarouselItemsValidator, handleBadRequest_1.default, product_controller_1.getCarouselItems);
router.get("/:id", getProductValidator, handleBadRequest_1.default, product_controller_1.getProduct);
exports.default = router;
