import { Request, Response, NextFunction } from "express"
import Basket from "../model/basket"
import MyError from "../utils/myError";
import { IReq } from "../utils/interface";

export const createBasket = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const newBasket= req.body;
       
        // console.log(userId);
        const data = await Basket.create(newBasket);
        res.status(200).json({ message: `Basket is created`});
    } catch (error: any) {
        next(error);
    }
};

export const addFoodToBasket = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, foodId, count } = req.body;
        console.log(userId, foodId, count);
        const userBasket = await Basket.findOne({ user: userId}).populate("foods.food");
        userBasket?.foods.push({ food: foodId, foods: foodId, count: count });
        await userBasket?.save();
        res.status(200).json({ message: "Basket is updated", userBasket});
    } catch (error: any) {
       next(error);
    }
}

export const deleteFoodFromBasket = async ( req: IReq, res: Response, next: NextFunction) => {
        try {
          
            const { foodId } = req.params;
            console.log(foodId);
            const userBasket = await Basket.findOne({ user: req.user._id});
            const findIndex = userBasket?.foods.findIndex((el) => el._id?.equals(foodId));
            if(findIndex !== undefined)
                userBasket?.foods.splice(findIndex, 1);
            await userBasket?.save();
            res.status(200).json({ message: "Food is deleted from basket"});
        } catch (error: any) {
            next(error);
        }
}

export const getBasketFoods = async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const basket = await Basket.findOne({ user: req.user._id}).populate("foods.food");
        console.log("swgsgwfgfgasggsagsas",basket);
        res.status(200).json({ message: "Got basket foods successfully", basket});
    } catch (error: any) {
        next(error);
    }
}