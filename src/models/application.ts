import mongoose, { Document, Schema } from "mongoose";

interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  employee: mongoose.Types.ObjectId;
  coverLetter: string;
  startDate: Date;
  status: string;
}

const ApplicationSchema: Schema<IApplication> = new Schema<IApplication>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Please provide employee"],
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Please provide job"],
    },
    coverLetter: {
      type: String,
      required: [true, "Please provide your cover letter"],
      maxlength: 300,
    },
    startDate: {
      type: Date,
      required: [true, "Please provide the start date"],
    },
    status: {
      type: String,
      enum: ["accepted", "declined", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);
ApplicationSchema.pre(/^find/, function (this: any, next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: "employee job", options: { _recursed: true } });
  next();
});
export default mongoose.model<IApplication>("Application", ApplicationSchema);
