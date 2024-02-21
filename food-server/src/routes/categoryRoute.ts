import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controller/categoryController";
import { authenticate, authorize } from "../middleware/auth"
import { upload }  from "../utils/multer";

const router = Router();

router.route("/")
  .get(getAllCategory)
  .post(upload.single("image"), createCategory);

router
  .route("/:categoryId")
  .get(authenticate, getCategory)
  .put(updateCategory)
  .delete(authenticate, authorize("Admin"), deleteCategory);

export default router;