import { NextFunction, Response } from "express";
import { IReq } from "../utils/interface";
import User from "../model/user";

export const createOrder = (req: IReq, res: Response, next: NextFunction ) => {
    try {
        const findUser = User.findOne({user: req.user._id});
        if(!findUser){
            
        }
        const newOrder = {
            orderNo: "1",
            payment: {
                amount: 150000,
                paymentDate: "2024/02/28",
                createdAt: "2024/02/28",
            },
            address: {
                khoroo: "1",
                duureg: "SBD",
                buildingNo: 26,
                additionalInfo: ""
            },
            delivery: {
                deliveredAt: "2024/02/28"
            }
        };
    } catch (error) {
        next(error);
    }
}