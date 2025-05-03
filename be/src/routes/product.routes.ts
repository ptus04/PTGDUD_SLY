import { Router } from "express";
import { param, query } from "express-validator";
import { getCarouselItems, getProduct, getProducts } from "../controllers/product.controller";
import handleBadRequest from "../utils/handleBadRequest";

const getProductsValidator = [
  query("limit").optional().isInt({ min: 1 }).withMessage("Limit must be a positive integer").toInt(),
  query("isNew").optional().isBoolean().withMessage("isNew must be a boolean").toBoolean(),
  query("category").optional().notEmpty().withMessage("Category is required"),
  query("query").optional().notEmpty().withMessage("Query is required"),
];
const getProductValidator = [param("id").notEmpty().isMongoId().withMessage("Invalid product ID")];
const getCarouselItemsValidator = [
  query("orientation").isIn(["landscape", "portrait"]).withMessage("Invalid orientation"),
];

const router = Router();
router.get("/", getProductsValidator, handleBadRequest, getProducts);
router.get("/carousel", getCarouselItemsValidator, handleBadRequest, getCarouselItems);
router.get("/:id", getProductValidator, handleBadRequest, getProduct);

export default router;
