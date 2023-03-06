import express from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();
app.disable("x-powered-by");

const allowedOrigins = [
  "http://localhost:4000",
  "https://dani-setien-final-project-front-202301-bcn.vercel.app/",
];
const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
