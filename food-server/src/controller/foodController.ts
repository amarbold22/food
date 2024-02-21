import { NextFunction, Request, Response } from "express";
import Food from "../model/food";
import MyError from "../utils/myError";

export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newFood = req.body;
    await Food.create(newFood);

    res.status(201).json({ message: "Хоол амжилттай үүслээ.", newFood });
  } catch (error) {
    next(error);
  }
};

export const getFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findById(foodId);

    if (!food) {
      throw new MyError(`${foodId}-тэй категори олдсонгүй.`, 400);
    }

    res.status(200).json({
      message: `${foodId}-тэй категори олдлоо`,
      food,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await Food.find().populate("category", "_id name");

    res.status(200).json({
      message: `Бүх хоол`,
      foods,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    const updateFood = req.body;

    const food = await Food.findByIdAndUpdate(
      foodId,
      updateFood
    );

    if (!food) {
      throw new MyError(`${foodId}-тэй категори олдсонгүй.`, 400);
    }

    res.status(200).json({
      message: `${foodId}-тэй категори шинэчлэгдлээ.`,
      food,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodId } = req.params;
    const food = await Food.findByIdAndDelete(foodId);

    if (!food) {
      throw new MyError(`${foodId}-тэй категори олдсонгүй.`, 400);
    }

    res.status(200).json({
      message: `${foodId}-тэй категори устгалаа.`,
      food,
    });
  } catch (error) {
    next(error);
  }
};