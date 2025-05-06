import { Router } from "express";
import { body } from "express-validator";
import { getCart, updateCart } from "../controllers/cart.controller";
import { auth } from "../middlewares/auth.middleware";
import handleBadRequest from "../utils/handleBadRequest";

const updateCartValidator = [body().isArray().withMessage("Body must be an array")];

const router = Router();
router.use(auth);
router.get("/", getCart);
router.put("/", updateCartValidator, handleBadRequest, updateCart);

export default router;
