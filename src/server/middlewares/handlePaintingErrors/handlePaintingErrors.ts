import { type NextFunction } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";

const handlePaintingErrors = (
  next: NextFunction,
  errorMessage = "Internal Server Error."
) => {
  const fetchPaintingError = new CustomError(
    errorMessage,
    500,
    "Internal Server Error."
  );

  next(fetchPaintingError);
};

export default handlePaintingErrors;
