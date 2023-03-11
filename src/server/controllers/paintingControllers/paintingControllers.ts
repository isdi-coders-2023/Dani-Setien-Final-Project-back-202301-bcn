import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import { Painting } from "../../../database/models/PaintingSchema.js";

export const getPaintings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paintings = await Painting.find().exec();

    res.status(200).json({ paintings });
  } catch (error: unknown) {
    const thrownError = new CustomError(
      (error as Error).message,
      500,
      "Internal Server Error."
    );

    next(thrownError);
  }
};
