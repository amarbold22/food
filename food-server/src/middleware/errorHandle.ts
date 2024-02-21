import { Response, Request, NextFunction } from "express";

interface IMyError extends Error {
  statusCode: number;
}

const errorHandler = (
  err: IMyError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ERR MIDD=====>", err.stack?.red.underline);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;