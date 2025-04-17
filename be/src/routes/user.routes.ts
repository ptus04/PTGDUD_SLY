import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { getUser, login, register } from "../controllers/user.controller";
import { body, param } from "express-validator";

const registerValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN"),
  body("password").isLength({ min: 8 }),
  body("email").normalizeEmail().isEmail(),
  body("name").notEmpty(),
  body("gender").isBoolean(),
];

const loginValidator = [
  body("phone").isLength({ min: 10, max: 10 }).isMobilePhone("vi-VN"),
  body("password").isLength({ min: 8 }),
];

// "me" or uid with ObjectId format
const getUserValidator = [
  param("uid").custom((value) => {
    if (value !== "me" && !/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new Error("Invalid value");
    }
    return true;
  }),
];

const router = Router();
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

router.use(auth);
router.get("/:uid", getUserValidator, getUser);

export default router;
