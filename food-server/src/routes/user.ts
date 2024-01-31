import { Router } from "express";
import { signup, login } from "../controller/user";

const router = Router();

router.route("/signup",).post(signup);
router.route("/login",).post(login);

export default router;
