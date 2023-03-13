import { CustomError } from "../../../CustomError/CustomError";
import { mockNext } from "../../../mocks/mocks";
import handlePaintingErrors from "./handlePaintingErrors";

describe("Given a handlePaintingErrors function", () => {
  describe("When it is called with a rejection reason 'Couldn't fetch painting'", () => {
    test("Then it should pass on an error that includes the rejection reason 'Couldn't fetch painting'", () => {
      const errorMessage = "Couldn't fetch painting";

      const fetchPaintingError = new CustomError(
        errorMessage,
        500,
        "Internal Server Error"
      );

      handlePaintingErrors(mockNext, errorMessage);

      expect(mockNext).toHaveBeenCalledWith(fetchPaintingError);
    });
  });
});
