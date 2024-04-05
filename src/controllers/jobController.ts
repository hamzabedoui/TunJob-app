import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Job from "../models/job";

import {} from "module";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { Request, Response } from "express";
import Manager from "../models/manager";

export const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs });
});

export const createJob = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { position, status, jobType, jobLocation } = req.body;
    const managerId = req.user.id;
    const manager = await Manager.findById(managerId);
    const job = await Job.create({
      company: manager?.company,
      position,
      status,
      jobType,
      jobLocation,
      manager,
    });
    res.status(StatusCodes.CREATED).json({ job });
  }
);
export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { position, status, jobType, jobLocation } = req.body;
  let job = await Job.findOne({ _id: id });
  if (!job) throw new NotFoundError("job not found");

  job = await Job.findByIdAndUpdate(
    id,
    { position, status, jobType, jobLocation },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ job, message: "job updated" });
});
export const getJob = asyncHandler(async (req: Request, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    throw new NotFoundError("job not found");
  }
  res.status(StatusCodes.OK).json({ job });
});
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError("job not found");
  }
  await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json("deleted job");
});