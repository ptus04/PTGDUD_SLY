import { Router } from "express";
import { body, param } from "express-validator";
import { getUser, login, register } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
import handleBadRequest from "../utils/handleBadRequest";

const registerValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("email").normalizeEmail().isEmail().withMessage("Invalid email format"),
  body("name").notEmpty().withMessage("Name is required"),
  body("gender").isBoolean().withMessage("Gender must be a boolean"),
];

const loginValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN").withMessage("Invalid phone number"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

const getUserValidator = [
  param("id").custom((value) => {
    if (!/(me)|([0-9a-fA-F]{24})/.test(value)) {
      throw new Error("ID must be 'me' or a valid ObjectId format");
    }

    return true;
  }),
];

const router = Router();
router.post("/register", registerValidator, handleBadRequest, register);
router.post("/login", loginValidator, handleBadRequest, login);

router.use(auth);
router.get("/:id", getUserValidator, handleBadRequest, getUser);

export default router;
