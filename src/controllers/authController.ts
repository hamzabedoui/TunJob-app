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
export const getMe = asyncHandler(async (req: Request | any, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new BadRequestError("User doesn't exist");
  }
  res.json(user);
});
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json({ users });
});
export const registerMg = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, company } = req.body;
  if (!email || !password || !username || !company) {
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
  const { username, email, password, academicLevel, location, jobTitle } =
    req.body;
  if (
    !email ||
    !password ||
    !username ||
    !academicLevel ||
    !location ||
    !jobTitle
  ) {
    throw new BadRequestError("please provide all credentials");
  }
  const duplicate = await Employee.findOne({ email });
  if (duplicate) {
    throw new BadRequestError("user with this email already exists");
  } else {
    const employee = await Employee.create({
      email,
      password,
      username,
      academicLevel,
      location,
      jobTitle,
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
export const logout = asyncHandler(
  async (req: Request | any, res: Response) => {
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({ message: "Logout successful" });
  }
);

/* export const requestPasswordReset = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { email } = req.body;
    let user;
    (await Manager.find({ email }))
      ? (user = Manager.findOne({ email }))
      : (user = Employee.findOne({ email }));
    if (!user) {
      throw new BadRequestError("User doesn't exist");
    }
    const token = await user?.generateToken();

    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();
    const resetLink = `http://localhost:3000/reset/${token}`; // Change this URL to your reset password page

    const mailOptions = {
      from: "haha@gmail.com",
      to: user.email,
      subject: "Password Reset",
      html: `<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent", user });
  }
);
export const resetPassword = asyncHandler(
  async (req: Request<unknown, unknown, any>, res: Response) => {
    const { password } = req.body;
    const { token }: any = req.params;
    const user = await UserRepository.find({
      resetToken: token,
      resetTokenExpires: { $gte: new Date(Date.now()) },
    });
    if (!user) {
      throw new BadTokenError("Invalid or expired token");
    }
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  }
);
 */
