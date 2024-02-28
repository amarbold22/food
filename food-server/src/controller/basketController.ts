import { Request, Response, NextFunction } from "express"
import Basket from "../model/basket"
import MyError from "../utils/myError";
import { IReq } from "../utils/interface";

export const addFoodToBasket = async ( req: IReq, res: Response, next: NextFunction) => {
    try {
        const userBasket = await Basket.findOne({ user: req.user._id}).populate("foods.food");
        if(!userBasket){
            const basket = await (
                await Basket.create({
                    user: req.user._id,
                    foods: {
                        food: req.body.food,
                        count: req.body.count
                    }
                })
            ).populate("foods.food");
            res.status(200).json({ message: "Basket is created", basket});
        }
        else{
            const findIndex = userBasket.foods.findIndex((el) => el.food?.toString() === req.body.food);
            if(findIndex !== -1){
                userBasket.foods[findIndex].count = Number(req.body.count);
                userBasket.totalPrice = Number(req.body.totalPrice);
            }

            const savedBasket = await ( await userBasket.save()).populate("foods.food");
            res.status(200).json({ message: "Basket is updated", basket: { foods: savedBasket, totalPrice: userBasket.totalPrice}});
        }
        
    } catch (error: any) {
       next(error);
    }
}

export const deleteFoodFromBasket = async ( req: IReq, res: Response, next: NextFunction) => {
        try {
            const { foodId } = req.params;
            const userBasket = await Basket.findOne({ user: req.user._id});
            if(!userBasket){
                throw new MyError("No basket info found", 400);
            }
            const findIndex = userBasket?.foods.findIndex((el) => el._id?.equals(foodId));
            if(findIndex !== -1)
                userBasket?.foods.splice(findIndex, 1);
            const savedBasket = await( await userBasket?.save()).populate("foods.food");
            res.status(200).json({ message: "Food is deleted from basket", basket: {foods: savedBasket.foods, totalPrice: savedBasket.totalPrice}});
        } catch (error: any) {
            next(error);
        }
}

export const getBasketFoods = async (req: IReq, res: Response, next: NextFunction) => {
    try {
        const userBasket = await Basket.findOne({ user: req.user._id}).populate("foods.food");
        if(!userBasket){
            throw new MyError("No basket info found", 404);
        }
        res.status(200).json({ message: "Got basket foods successfully", basket: { foods: userBasket.foods, totalPrice: userBasket.totalPrice}});
    } catch (error: any) {
        next(error);
    }
}