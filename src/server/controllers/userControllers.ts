import "../../loadEnvironments.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type Response, type NextFunction } from "express";
import { type CustomLoginRequest } from "../../types.js";
import { User } from "../../database/models/UserSchema.js";
import { rejectedLogin } from "../middlewares/rejectedLogin/rejectedLogin.js";

export const loginUser = async (
  req: CustomLoginRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    const reasonForRejection = "username";
    rejectedLogin(reasonForRejection, next);

    return;
  }

  const loginSuccess = await bcrypt.compare(password, user.password);

  if (!loginSuccess) {
    const reasonForRejection = "password";
    rejectedLogin(reasonForRejection, next);

    return;
  }

  const jwtPayload = {
    sub: user._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
};
