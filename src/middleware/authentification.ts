/* import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
import {ProtectedRequest} from "../types/index";

const auth = async (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // check header
  const authHeader = req.headers.authorization;
  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer")
  ) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload: { userId: string } = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as { userId: string };
    // attach the user to the job routes
    const testUser: boolean = payload.userId === "62f801d0510a7c1ed2312d52";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
 */
