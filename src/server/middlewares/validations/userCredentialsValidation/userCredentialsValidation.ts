import { type NextFunction, type Request, type Response } from "express";
import { Joi } from "express-validation";
import { CustomError } from "../../../../CustomError/CustomError.js";
import { type CustomLoginRequest } from "../../../../types.js";

const userCredentialsValidation = (
  request: CustomLoginRequest,
  response: Response,
  next: NextFunction
) => {
  const credentialsValidation = Joi.object({
    email: Joi.string().email().min(8).max(24).required(),
    password: Joi.string().alphanum().min(8).max(32).required(),
  });

  const { error: invalidCredentials } = credentialsValidation.validate(
    request.body,
    {
      abortEarly: false,
    }
  );

  if (invalidCredentials) {
    const userFeedbackMessages = invalidCredentials.details
      .map((detail) => detail.message.replaceAll(`"`, ""))
      .join(" and ");

    const invalidCredentialsError = new CustomError(
      "Invalid user credentials",
      400,
      userFeedbackMessages
    );

    next(invalidCredentialsError);
  } else {
    next();
  }
};

export default userCredentialsValidation;
