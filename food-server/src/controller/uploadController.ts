import { NextFunction, Request, Response } from "express"
import cloudinary from "../utils/cloudinary";

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("File", req.file);
        const result = await cloudinary.uploader.upload(req.file?.path!);
        res.json({image_url: result.secure_url});
    } catch (error) {
        next(error);
    }
};