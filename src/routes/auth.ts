import express from "express";
import {
  registerMg,
  registerEmp,
  login,
  getAllUsers,
  getMe,
  logout,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController";
import { authentification } from "../middleware/authentification";

export const authRouter = express.Router();

authRouter
  .post("/registermg", registerMg)
  .post("/registeremp", registerEmp)
  .post("/login", login)
  .post("/forgot-password", requestPasswordReset)
  .post("/reset-password/:token", resetPassword)
  .get("/all", getAllUsers)
  .get("/userinfo", authentification, getMe)
  .post("/logout", authentification, logout);
