import { NextFunction, Request, Response } from "express";
import { IReq } from "../utils/interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { sendEmail } from "../utils/sendEmail";
import MyError from "../utils/myError";

export const signup = async (req: Request, res: Response) => {
  console.log("Signup");
  try {
    const newUser = req.body;
    const user = await User.create({ ...newUser});
    const verifyToken = jwt.sign(
      { email: user.email },
      process.env.JWT_PRIVATE_KEY as string,
      {
        expiresIn: "5m",
      }
    );
    sendEmail({ email: user.email, token: verifyToken });
    res.status(201).json({
      message:
        "Шинэ хэрэглэгч амжилттай бүртгэгдлээ.", userInfo: user
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Шинэ хэрэглэгч бүртгэх үед алдаа гарлаа.", error });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: `${email}-тэй хэрэглэгч бүртгэлгүй байна.` });
    }

    const isValid = await bcrypt.compare(pass, user.password);

    if (!isValid) {
      throw new MyError(`И-мейл эсвэл нууц үг буруу байна`, 400);
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_PRIVATE_KEY as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    console.log("user.ts token", token);
    res.status(201).json({ message: "Хэрэглэгч амжилттай нэвтэрлээ", token, user });
  } catch (error) {
    next(error);
  }
};