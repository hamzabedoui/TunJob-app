import { authRouter } from "./auth";
import { jobRouter } from "./jobs";
import { appRouter } from "./application";
import express from "express";
import { authentification } from "../middleware/authentification";

export const router = express.Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/jobs", authentification, jobRouter);
router.use("/api/v1/applications", authentification, appRouter);
