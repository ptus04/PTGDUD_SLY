import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { getUser, login, register } from "../controllers/user.controller";
import { validateRegister } from "../middlewares/validateUserRegister.middleware";

const router = Router();
router.post("/register", validateRegister, register);
router.post("/login", login);

router.use(auth);
router.get("/:_id", getUser);

export default router;
