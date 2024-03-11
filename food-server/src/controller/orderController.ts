import { NextFunction, Response } from "express";
import { IReq } from "../utils/interface";
import User from "../model/user";
import Basket from "../model/basket";

export const createOrder = async (req: IReq, res: Response, next: NextFunction ) => {
    try {
        const findUser = await User.findOne({user: req.user._id});
        if(findUser?.orders){
            const basket = await Basket.findById({user: req.user._id});
            // const newOrder = {
            //     orderNo: "#" + `${Math.floor(Math.random() * 1000000)}`,
            //     payment: {
            //         amount: basket?.totalPrice,
            //     },
            //     address: {
            //         khoroo: "1",
            //         duureg: "SBD",
            //         buildingNo: 26,
            //         additionalInfo: ""
            //     },
            //     products: basket
            // };
            findUser?.orders.push(req.body.orderInfo);
            await findUser?.save();
            await Basket.findByIdAndDelete({user: req.user._id});
            res.status(200).json({message: "order is updated", orders: findUser.orders});
        }
        else{
            res.status(400).json({message: "Error in createOrder"});
        }    
    } catch (error) {
        next(error);
    }
}