import { Router } from "express";
import { body, param } from "express-validator";
import { cancelOrder, createOrder, getAllOrders, getOrder, getOrders } from "../controllers/order.controller";
import { auth } from "../middlewares/auth.middleware";
import handleBadRequest from "../utils/handleBadRequest";

const createOrderValidator = [
  body("shippingAddress").notEmpty().withMessage("Shipping address is required"),
  body("shippingAddress.name").notEmpty().withMessage("Shipping Name is required"),
  body("shippingAddress.phone").notEmpty().withMessage("Shipping Phone is required"),
  body("shippingAddress.city").notEmpty().withMessage("Shipping City is required"),
  body("shippingAddress.district").notEmpty().withMessage("Shipping District is required"),
  body("shippingAddress.ward").notEmpty().withMessage("Shipping Ward is required"),
  body("shippingAddress.address").notEmpty().withMessage("Shipping Address is required"),
  body("paymentMethod").notEmpty().isIn(["cash"]).withMessage("Invalid payment method"),
  body("items").isArray().isLength({ min: 1 }).withMessage("Items must be an array"),
  body("items.*.productId").notEmpty().withMessage("Product ID is required"),
  body("items.*.quantity").notEmpty().withMessage("Quantity is required"),
  body("items.*.size").notEmpty().withMessage("Size is required"),
  body("items.*.price").notEmpty().withMessage("Price is required"),
  body("note").optional().isString().withMessage("Note must be a string"),
];

const getOrderValidator = [param("orderId").notEmpty().withMessage("Order ID is required")];

const cancelOrderValidator = [
  body("orderId").notEmpty().withMessage("Order ID is required"),
  body("reason").notEmpty().withMessage("Reason is required"),
];

const router = Router();
router.get("/", getAllOrders);
router.use(auth);
router.get("/", getOrders);
router.post("/", createOrderValidator, handleBadRequest, createOrder);
router.delete("/", cancelOrderValidator, handleBadRequest, cancelOrder);
router.get("/:orderId", getOrderValidator, handleBadRequest, getOrder);

export default router;
