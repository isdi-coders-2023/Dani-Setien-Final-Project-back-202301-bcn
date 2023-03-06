import express from "express";
import cors from "cors";
import morgan from "morgan";
import { notFoundError } from "../middlewares/notFoundError/notFoundError.js";
import { generalError } from "../middlewares/generalError/generalError.js";
import ping from "../middlewares/ping/ping.js";

export const app = express();
app.disable("x-powered-by");

const allowedOrigins = [
  "http://localhost:4000",
  "https://dani-setien-final-project-front-202301-bcn.vercel.app/",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.get("/", ping);

app.use("/", notFoundError);
app.use("/", generalError);
