import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controller/uploadController";
import { upload } from "../utils/multer";

const router = Router();
router.route("/").post(upload.single("image"), uploadFile);

export default router;
