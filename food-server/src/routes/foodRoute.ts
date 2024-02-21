import { Router } from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  getFood,
  updateFood,
} from "../controller/foodController";

const router = Router();

router
  .route("/")
  .get(getAllFoods)
  .post(createFood);

router
  .route("/:foodId")
  .get(getFood)
  .put(updateFood)
  .delete(deleteFood);

export default router;