import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  addFoodToBasket,
  createBasket,
  deleteFoodFromBasket,
  getBasketFoods,
} from "../controller/basketController";

const router = Router();
router
  .route("/")
  .get(authenticate, getBasketFoods)
  .post(createBasket)
  .put(addFoodToBasket)
router.route("/:foodId")
  .delete(authenticate, deleteFoodFromBasket);
export default router;