import { type Painting } from "../../types";
import { type PaintingSupertestResponse } from "./types";

export const deleteDatabaseInsertedUnpredictableProperties = (
  painting: PaintingSupertestResponse
): Painting => {
  delete painting.id;
  delete painting.__v;

  return painting;
};
