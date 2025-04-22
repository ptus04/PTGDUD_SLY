import { Router } from "express";
import { param, query } from "express-validator";
import { getCarouselItems, getProduct, getProducts } from "../controllers/product.controller";

const getProductValidator = [param("id").notEmpty().isMongoId()];
const getCarouselItemsValidator = [query("orientation").isIn(["landscape", "portrait"])];

const router = Router();
router.get("/", getProducts);
router.get("/carousel", getCarouselItemsValidator, getCarouselItems);
router.get("/:id", getProductValidator, getProduct);

export default router;
