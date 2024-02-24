import { Request, Response, NextFunction } from "express"
import Basket from "../model/basket"
import MyError from "../utils/myError";

export const createBasket = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const basket = { 
            user: userId,
            foods: []
        };
        
        const data = await Basket.create(basket);
        res.status(200).json({ message: "Basket is created"});
    } catch (error: any) {
        next(error);
    }
};

export const addFoodToBasket = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, foodId, count } = req.body;
        const userBasket = await Basket.findOne({ user: userId});
        userBasket?.foods.push({ foods: foodId, count: count });
        await userBasket?.save();
        res.status(200).json({ message: "Basket is updated", userBasket});
    } catch (error: any) {
       next(error);
    }
}

export const deleteFoodFromBasket = async ( req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, foodId, count } = req.body;
            const userBasket = await Basket.findOne({ user: userId});
            userBasket?.foods.filter((food) => {
                food._id !== foodId;
            });
            await userBasket?.save();
            res.status(200).json({ message: "Food is deleted from basket"});
        } catch (error: any) {
            next(error);
        }
}

export const getBasketFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const basket = await Basket.findOne({ user: userId}).populate("foods.food");

        res.status(200).json({ message: "Got basket foods successfully", basket});
    } catch (error: any) {
        next(error);
    }
}