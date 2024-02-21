import { Request } from "express";

export interface IReq extends Request {
  [key: string]: any;
}