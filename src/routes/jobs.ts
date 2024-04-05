import express from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController";

export const jobRouter = express.Router();

jobRouter.route("/").get(getAllJobs).post(createJob);
jobRouter.route("/:id").delete(deleteJob).put(updateJob).get(getJob);
