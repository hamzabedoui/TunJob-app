import express from "express";
import {
  createApplications,
  getAllApplications,
} from "../controllers/applicationController";

export const appRouter = express.Router();

appRouter.route("/:id").post(createApplications);
appRouter.route("/").get(getAllApplications);
