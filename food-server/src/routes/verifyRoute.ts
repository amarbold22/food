import { Router } from "express";
import { sendEmailToUser } from "../controller/verifyController";

const router = Router();

router.route("/send-email").post(sendEmailToUser);

export default router;