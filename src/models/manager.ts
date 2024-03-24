import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import User, { UserDocument } from "./user";

// Define ManagerDocument extending UserDocument
export interface ManagerDocument extends UserDocument {
  company?: string;
}

// Create managerSchema extending userSchema
const managerSchema: Schema<ManagerDocument> = new mongoose.Schema({
  ...User.schema.obj,
  company: {
    type: String,
  },
});

// Pre-save hook for hashing password
managerSchema.pre<ManagerDocument>("save", async function (next) {
  await User.schema.methods.save.call(this, next);
});

// Extend User model to create Manager model
const Manager: Model<ManagerDocument> = User.discriminator<ManagerDocument>(
  "Manager",
  managerSchema
);

export default Manager;
