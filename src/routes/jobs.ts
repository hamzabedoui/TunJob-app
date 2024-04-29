import express from "express";
import {
  getAllJobs,
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController";

export const jobRouter = express.Router();

jobRouter.route("/").get(getJobs).post(createJob);
jobRouter.route("/all").get(getAllJobs);
jobRouter.route("/:id").delete(deleteJob).put(updateJob).get(getJob);
