import { Router } from "express";
import { createOrder } from "../controller/orderController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.route("/")
    .post(authenticate, createOrder);

export default router;