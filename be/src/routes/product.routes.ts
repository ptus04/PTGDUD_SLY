import { Router } from "express";
import { param, query } from "express-validator";
import { getCarouselItems, getProduct, getProducts } from "../controllers/product.controller";

const getProductValidator = [param("id").notEmpty().isMongoId().withMessage("Invalid product ID")];
const getCarouselItemsValidator = [
  query("orientation").isIn(["landscape", "portrait"]).withMessage("Invalid orientation"),
];

const router = Router();
router.get("/", getProducts);
router.get("/carousel", getCarouselItemsValidator, getCarouselItems);
router.get("/:id", getProductValidator, getProduct);

export default router;
