import { type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { Painting } from "../../../database/models/PaintingSchema";
import {
  mockNext,
  mockPaintings,
  mockRequest,
  mockResponse,
} from "../../../mocks/mocks";
import { getPaintings } from "./paintingControllers";

beforeEach(() => jest.clearAllMocks());

describe("Given a getPaintings controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its response function's status method with value 200", async () => {
      const expectedStatusCode = 200;

      Painting.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockPaintings),
      }));

      await getPaintings(mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its response function's json method with a list of paintings", async () => {
      const mockExpectedPaintingsCall = { paintings: mockPaintings };

      Painting.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockPaintings),
      }));

      await getPaintings(mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockExpectedPaintingsCall);
    });
  });

  describe("When it receives an error", () => {
    test("Then it should handle it and pass it on with its next function", async () => {
      const thrownErrorMessage = "Service Unavailable";
      const thrownStatusCode = 503;
      const thrownPublicErrorMessage = thrownErrorMessage;

      const expectedThrownError = new CustomError(
        thrownErrorMessage,
        thrownStatusCode,
        thrownPublicErrorMessage
      );

      Painting.find = jest.fn().mockImplementationOnce(() => {
        throw new Error(thrownErrorMessage);
      });

      await getPaintings(mockRequest, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expectedThrownError);
    });
  });
});
