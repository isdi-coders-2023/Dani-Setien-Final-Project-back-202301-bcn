import { type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { Painting } from "../../../database/models/PaintingSchema";
import {
  mockNext,
  mockPaintings,
  mockRequest,
  mockResponse,
} from "../../../mocks/mocks";
import { getPaintingById, getPaintings } from "./paintingControllers";

beforeEach(() => jest.clearAllMocks());

const thrownErrorMessage = "Service Unavailable";
const thrownStatusCode = 503;
const thrownPublicErrorMessage = thrownErrorMessage;

const expectedThrownError = new CustomError(
  thrownErrorMessage,
  thrownStatusCode,
  thrownPublicErrorMessage
);

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

  describe("When it receives an error with message 'Service Unavailable'", () => {
    test("Then it should handle it and pass it on with its next function", async () => {
      Painting.find = jest.fn().mockImplementationOnce(() => {
        throw new Error(thrownErrorMessage);
      });

      await getPaintings(mockRequest, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expectedThrownError);
    });
  });
});

describe("Given a getPaintingById controller", () => {
  const paintingId = "irrelevantId";

  mockRequest.params = { idPainting: paintingId };

  describe("When it receives a response", () => {
    test("Then it should call its response function's status method with value 200", async () => {
      const expectedStatusCode = 200;

      Painting.findById = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockPaintings[0]),
      }));

      await getPaintingById(mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its response function's json method with a painting", async () => {
      const mockExpectedPaintingsCall = { paintings: mockPaintings[0] };

      Painting.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockPaintings[0]),
      }));

      await getPaintings(mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockExpectedPaintingsCall);
    });
  });

  describe("When it receives an error with message 'Service Unavailable'", () => {
    test("Then it should handle it and pass it on with its next function", async () => {
      Painting.findById = jest.fn().mockImplementationOnce(() => {
        throw new Error(thrownErrorMessage);
      });

      await getPaintingById(mockRequest, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expectedThrownError);
    });
  });
});
