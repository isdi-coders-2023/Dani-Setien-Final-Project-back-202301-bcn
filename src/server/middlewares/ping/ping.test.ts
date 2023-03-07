import { type Response } from "express";
import { mockNext, mockRequest, mockResponse } from "../../../mocks/mocks";

import ping from "./ping";

describe("Given a ping middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and a 'pong 🏓' message", async () => {
      const expectedStatusCode = 200;

      ping(mockRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
