import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { getUser, login, register } from "../controllers/user.controller";
import { validateRegister } from "../middlewares/validateRegister.middleware";

const router = Router();
router.post("/register", validateRegister, register);
router.post("/login", login);

router.use(auth);
router.get("/:uid", getUser);

export default router;
