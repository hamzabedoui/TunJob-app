import express from "express";
import {
  registerMg,
  registerEmp,
  login,
  getAllUsers,
  getMe,
} from "../controllers/authController";
import { authentification } from "../middleware/authentification";
export const authRouter = express.Router();

authRouter
  .post("/registermg", registerMg)
  .post("/registeremp", registerEmp)
  .post("/login", login)
  .get("/all", getAllUsers)
  .get("/userinfo", authentification, getMe);
