import { type Painting, type Paintings } from "../../types";

export interface PaintingSupertestResponse extends Painting {
  id?: string;
  __v?: string;
}

export interface SupertestPaintingRequestResponse {
  body: {
    painting: Painting;
    paintings: Paintings;
  };
}
