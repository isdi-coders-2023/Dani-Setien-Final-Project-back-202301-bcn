import { Router } from "express";
import {
  getPaintingById,
  getPaintings,
} from "../../controllers/paintingControllers/paintingControllers.js";

const paintingsRouter = Router();

paintingsRouter.get("/", getPaintings);
paintingsRouter.get("/:idPainting", getPaintingById);

export default paintingsRouter;
