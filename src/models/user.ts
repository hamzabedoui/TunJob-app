import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  resetToken: string;
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
  resetTokenExpires: Date;
}

export interface UserModel extends Model<UserDocument> {}

const userSchema: Schema<UserDocument> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email invalid",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: Date,
  },
});

userSchema.pre<UserDocument>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateToken = function (): string {
  const token = jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET as Secret,
    { expiresIn: process.env.EXPIRATION_DATE }
  );
  return token;
};

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User: UserModel = mongoose.model<UserDocument, UserModel>(
  "User",
  userSchema
);

export default User;
