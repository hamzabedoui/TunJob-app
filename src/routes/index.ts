import { authRouter } from "./auth";
import express from "express";
/* import {authenticationMiddleware} from '../middleware/authentication' */

export const router = express.Router();

router.use("/api/v1/auth", authRouter);
