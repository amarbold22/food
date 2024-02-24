import { NextFunction, Request, Response } from "express";
import Category from "../model/category";
import MyError from "../utils/myError";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = req.body;
    const category = await Category.create(newCategory);
    res
      .status(201)
      .json({ message: "created category successfully", category });
  } catch (error) {
    next(error);
  }
};
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const findCatrogry = await Category.findById(categoryId);
    if (!findCatrogry) {
      throw new MyError(`${categoryId}-hereglegch alga`, 400);
    }
    res
      .status(200)
      .json({ message: `${categoryId}-found this  category `, findCatrogry });
  } catch (error) {
    next(error);
  }
};
export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ message: `Found all categories `, categories });
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const updateCatrogry = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      updateCatrogry
    );
    if (!category) {
      throw new MyError(`${categoryId}-hereglegch alga`, 400);
    }
    res
      .status(200)
      .json({ message: `${categoryId}-found this  category `, category });
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const deleteCatrogry = await Category.findByIdAndDelete(categoryId);
    if (!deleteCatrogry) {
      throw new MyError(`${categoryId}-hereglegch alga`, 400);
    }
    res.status(200).json({
      message: `${categoryId}-deleted this  category `,
      deleteCatrogry,
    });
  } catch (error) {
    next(error);
  }
};
