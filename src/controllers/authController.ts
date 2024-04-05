import User from "../models/user";
import Manager from "../models/manager";
import Employee from "../models/employee";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { Request, Response } from "express";
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users });
});
export const registerMg = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, company } = req.body;
  if (!email || !password || !name || !company) {
    throw new BadRequestError("please provide all credentials");
  }
  const duplicate = await Manager.findOne({ email });
  if (duplicate) {
    throw new BadRequestError("user with this email already exists");
  } else {
    const manager = await Manager.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(manager);
  }
});
export const registerEmp = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, experience } = req.body;
  if (!email || !password || !name || !experience) {
    throw new BadRequestError("please provide all credentials");
  }
  const duplicate = await Employee.findOne({ email });
  if (duplicate) {
    throw new BadRequestError("user with this email already exists");
  } else {
    const employee = await Employee.create({
      email,
      password,
      name,
      experience,
    });
    res.status(StatusCodes.CREATED).json(employee);
  }
});
interface LoginInput {
  email: string;
  password: string;
}

export const login = asyncHandler(
  async (req: Request<unknown, unknown, LoginInput>, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("provide credentials");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new BadRequestError("User doesn't exist, please check email");
    } else {
      const match = await user?.comparePassword(password);
      if (match === false) {
        throw new UnauthenticatedError("permission denied");
      }

      const token = user?.generateToken();
      const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
      res.cookie("token", token, cookieOptions);
      res
        .status(StatusCodes.OK)
        .json({ messsage: "user logged in successfully", user, token });
    }
  }
);
