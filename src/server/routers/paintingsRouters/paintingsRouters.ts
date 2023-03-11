import { Router } from "express";
import { getPaintings } from "../../controllers/paintingControllers/paintingControllers.js";

const paintingsRouter = Router();

paintingsRouter.get("/", getPaintings);

export default paintingsRouter;
