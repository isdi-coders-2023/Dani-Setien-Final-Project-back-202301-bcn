import { Router } from "express";
import { loginUser } from "../../controllers/userControllers.js";
import userCredentialsValidation from "../../middlewares/validations/userCredentialsValidation/userCredentialsValidation.js";

const usersRouter = Router();

usersRouter.post("/login", userCredentialsValidation, loginUser);

export default usersRouter;
