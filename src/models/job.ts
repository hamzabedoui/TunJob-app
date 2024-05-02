import mongoose, { Document, Schema } from "mongoose";

interface IJob extends Document {
  company: string;
  position: string;
  status: "interview" | "declined" | "pending";
  manager: mongoose.Types.ObjectId;
  applications: mongoose.Types.ObjectId[];
  jobType: "full-time" | "part-time" | "remote" | "internship";
  jobLocation: string;
}

const JobSchema: Schema<IJob> = new Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager",
      required: [true, "Please provide manager"],
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);
JobSchema.pre(/^find/, function (this: any, next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: "manager applications", options: { _recursed: true } });
  next();
});
export default mongoose.model<IJob>("Job", JobSchema);