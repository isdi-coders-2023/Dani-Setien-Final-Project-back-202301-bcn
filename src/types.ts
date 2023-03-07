import { type Request } from "express";

export interface CustomLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
