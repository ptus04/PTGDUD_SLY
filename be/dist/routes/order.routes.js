"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const handleBadRequest_1 = __importDefault(require("../utils/handleBadRequest"));
const createOrderValidator = [
    (0, express_validator_1.body)("shippingAddress").notEmpty().withMessage("Shipping address is required"),
    (0, express_validator_1.body)("shippingAddress.name").notEmpty().withMessage("Shipping Name is required"),
    (0, express_validator_1.body)("shippingAddress.phone").notEmpty().withMessage("Shipping Phone is required"),
    (0, express_validator_1.body)("shippingAddress.city").notEmpty().withMessage("Shipping City is required"),
    (0, express_validator_1.body)("shippingAddress.district").notEmpty().withMessage("Shipping District is required"),
    (0, express_validator_1.body)("shippingAddress.ward").notEmpty().withMessage("Shipping Ward is required"),
    (0, express_validator_1.body)("shippingAddress.address").notEmpty().withMessage("Shipping Address is required"),
    (0, express_validator_1.body)("paymentMethod").notEmpty().isIn(["cash"]).withMessage("Invalid payment method"),
    (0, express_validator_1.body)("items").isArray().isLength({ min: 1 }).withMessage("Items must be an array"),
    (0, express_validator_1.body)("items.*.productId").notEmpty().withMessage("Product ID is required"),
    (0, express_validator_1.body)("items.*.quantity").notEmpty().withMessage("Quantity is required"),
    (0, express_validator_1.body)("items.*.size").notEmpty().withMessage("Size is required"),
    (0, express_validator_1.body)("items.*.price").notEmpty().withMessage("Price is required"),
    (0, express_validator_1.body)("note").optional().isString().withMessage("Note must be a string"),
];
const getOrderValidator = [(0, express_validator_1.param)("orderId").notEmpty().withMessage("Order ID is required")];
const cancelOrderValidator = [
    (0, express_validator_1.body)("orderId").notEmpty().withMessage("Order ID is required"),
    (0, express_validator_1.body)("reason").notEmpty().withMessage("Reason is required"),
];
const router = (0, express_1.Router)();
router.use(auth_middleware_1.auth);
router.get("/", order_controller_1.getOrders);
router.post("/", createOrderValidator, handleBadRequest_1.default, order_controller_1.createOrder);
router.delete("/", cancelOrderValidator, handleBadRequest_1.default, order_controller_1.cancelOrder);
router.get("/:orderId", getOrderValidator, handleBadRequest_1.default, order_controller_1.getOrder);
exports.default = router;
