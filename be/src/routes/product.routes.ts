import { Router } from "express";
import {
  getCarouselItems,
  getProduct,
  getProducts,
} from "../controllers/product.controller";
import { param, query } from "express-validator";

const getProductValidator = [param("pid").notEmpty().isMongoId()];
const getCarouselItemsValidator = [
  query("orientation").isIn(["landscape", "portrait"]),
];

const router = Router();
router.get("/", getProducts);
router.get("/carousel", getCarouselItemsValidator, getCarouselItems);
router.get("/:pid", getProductValidator, getProduct);

export default router;
