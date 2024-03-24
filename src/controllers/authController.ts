import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { Request, Response } from "express";
export const register = asyncHandler(async (req: Request, res: Response) => {
  res.send("our first route");
});
