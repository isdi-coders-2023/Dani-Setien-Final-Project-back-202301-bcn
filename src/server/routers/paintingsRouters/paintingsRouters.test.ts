import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../../database/connectDatabase";
import { app } from "../..";
import { Painting } from "../../../database/models/PaintingSchema";
import { mockPaintings } from "../../../mocks/mocks";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a GET paintings/ endpoint", () => {
  const getPaintingsEndpoint = "/paintings/";

  describe("When it receives a request to get a list of 2 paintings", () => {
    beforeAll(async () => {
      await Painting.insertMany(mockPaintings);
    });

    test("Then it should respond with a list of 2 paintings", async () => {
      const expectedPaintingsResponse = mockPaintings;

      const response = await request(app).get(getPaintingsEndpoint);

      expect(response.body.paintings.length).toBe(
        expectedPaintingsResponse.length
      );
    });

    test("Then it should respond with a status 200 response", async () => {
      const expectedStatusResponse = 200;

      await request(app)
        .get(getPaintingsEndpoint)
        .expect(expectedStatusResponse);
    });
  });
});
