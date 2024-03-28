import express from "express";
import {
  registerMg,
  registerEmp,
  login,
  getAllUsers,
} from "../controllers/authController";

export const authRouter = express.Router();

authRouter
  .post("/registermg", registerMg)
  .post("/registeremp", registerEmp)
  .post("/login", login)
  .get("/all", getAllUsers);
