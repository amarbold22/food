import { Router } from "express";
import { getUsers } from "../controller/userController";

const router = Router();

router.route("/").get(getUsers);

export default router;