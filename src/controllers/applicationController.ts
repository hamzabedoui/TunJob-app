import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { Request, Response } from "express";
import App from "../models/application";
import Job from "../models/job";
import Employee from "../models/employee";
import Manager from "../models/manager";

export const getAllApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const apps = await App.find();
    res.status(StatusCodes.OK).json({ apps });
  }
);

export const createApplications = asyncHandler(
  async (req: Request | any, res: Response) => {
    const empID = req.user.id;
    const emp = await Employee.findById(empID);
    if (!emp) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send("unauthorized to access this route");
    }
    const { coverLetter, startDate } = req.body;
    const { id } = req.params;

    if (!coverLetter || !startDate) {
      res.json("must provide application fields");
    }
    const job = await Job.findById(id);
    if (!job) {
      throw new NotFoundError("job not found");
    }
    const existingApplication = await App.findOne({
      job: job._id,
      employee: empID,
    });
    if (existingApplication) {
      throw new Error("You cannot make two applications for the same job.");
    }
    const application = await App.create({
      coverLetter,
      startDate,
      employee: empID,
      job: job._id,
    });

    job!.applications.push(application._id);
    await job.save();
    res
      .status(StatusCodes.CREATED)
      .json({ application, message: "comment is created" });
  }
);

export const getApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
      throw new NotFoundError("job not found");
    }
    res.status(StatusCodes.OK).json({ job });
  }
);
export const updateApplication = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { id } = req.params;
    const { status, coverLetter, startDate } = req.body;
    const employee = await Employee.findById(req.user.id);
    if (employee) {
      if (status) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send("Unauthorized to update this field");
        return;
      }
    } else {
      const manager = await Manager.findById(req.user.id);
      if (!manager) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send("Unauthorized to access this route");
        return;
      }
      if (!status) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send("Unauthorized to update this field");
        return;
      }
    }
    let updateFields = {};
    if (employee) {
      updateFields = { coverLetter, startDate };
    } else {
      updateFields = { status };
    }

    const application = await App.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!application) {
      throw new NotFoundError("Application not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ application, message: "Application updated successfully" });
  }
);
