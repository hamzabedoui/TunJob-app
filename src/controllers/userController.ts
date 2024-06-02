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
export const updateUser = asyncHandler(
  async (req: Request | any, res: Response) => {
    const userID = req.user.id;
    const { email, username, password, ...rest } = req.body;
    let user;
    if (!userID) {
      throw new BadRequestError("User doesn't exist");
    }
    const manager = await Manager.findById(userID);
    const employee = await Employee.findById(userID);
    if (manager) {
      user = manager;
    } else if (employee) {
      user = employee;
    } else {
      throw new BadRequestError("User doesn't exist");
    }
    if (email) user.email = email;
    if (username) user.username = username;
    if (password) user.password = password;
    if (user instanceof Manager) {
      if (rest.company) user.company = rest.company;
    } else if (user instanceof Employee) {
      if (rest.academicLevel) user.academicLevel = rest.academicLevel;
      if (rest.location) user.location = rest.location;
      if (rest.jobTitle) user.jobTitle = rest.jobTitle;
    }
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "User updated successfully", user });
  }
);
export const deleteUser = asyncHandler(
  async (req: Request | any, res: Response) => {
    const userID = req.user.id;
    const { email, password } = req.body;
    if (!userID) {
      throw new BadRequestError("User doesn't exist");
    }
    if (!email || !password) {
      throw new BadRequestError("Please provide your email and password");
    }
    const manager = await Manager.findById(userID);
    const employee = await Employee.findById(userID);
    if (manager) {
      await Manager.findOneAndDelete({ _id: userID });
    } else if (employee) {
      await Employee.findOneAndDelete({ _id: userID });
    } else {
      throw new BadRequestError("User doesn't exist");
    }

    res.status(StatusCodes.OK).json("The account is deleted successfully");
  }
);
