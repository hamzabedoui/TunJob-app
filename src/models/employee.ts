import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import User, { UserDocument } from "./user";

// Define EmployeeDocument extending UserDocument
export interface EmployeeDocument extends UserDocument {
  experience: number;
}

// Create employeeSchema extending userSchema
const employeeSchema: Schema<EmployeeDocument> = new mongoose.Schema({
  /* ...User.schema.obj, */
  experience: {
    type: Number,
    required: [true, "Please provide experience"],
  },
});

// Pre-save hook for hashing password
/* employeeSchema.pre<EmployeeDocument>("save", async function (next) {
  await User.schema.methods.save.call(this, next);
}); */

// Extend User model to create Employee model
const Employee: Model<EmployeeDocument> = User.discriminator<EmployeeDocument>(
  "Employee",
  employeeSchema
);

export default Employee;
