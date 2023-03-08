import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../../database/connectDatabase";
import { User } from "../../../database/models/UserSchema";
import { type UserStructure, type UserCredentials } from "../../../types";
import { app } from "../..";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUserCredentials: UserCredentials = {
  email: "felix@bauhaus.com",
  password: "iAmFelix",
};

const mockUser: UserStructure = {
  ...mockUserCredentials,
  username: "FelixTheCat",
};

describe("Given a POST users/login endpoint", () => {
  const endpoint = "/user/login";

  describe("When it receives a request with name 'felix' and password 'wrongPassword'", () => {
    beforeAll(async () => {
      const saltLength = 10;
      const hashedPassword = await bcrypt.hash(
        mockUserCredentials.password,
        saltLength
      );

      const userCreationRequest: UserStructure = {
        password: hashedPassword,
        email: mockUserCredentials.email,
        username: mockUser.username,
      };

      await User.create(userCreationRequest);
    });

    test("Then it should respond with status 401 and an error message", async () => {
      const expectedStatusCode = 401;
      const wrongPassword = "wrongPassword";
      const expectedResponse = {
        error:
          "The combination loginname and password is incorrect, please try again.",
      };

      const userCredentials = {
        email: mockUserCredentials.email,
        password: wrongPassword,
      };

      const response = await request(app)
        .post(endpoint)
        .send(userCredentials)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });

  describe("When it receives a request with name 'felix' and password 'iAmFelix'", () => {
    beforeAll(async () => {
      const saltLength = 10;
      const hashedPassword = await bcrypt.hash(
        mockUserCredentials.password,
        saltLength
      );

      const userCreationRequest: UserStructure = {
        password: hashedPassword,
        email: mockUserCredentials.email,
        username: mockUser.username,
      };

      await User.create(userCreationRequest);
    });

    test("Then it should respond with status 200 and a token", async () => {
      const expectedStatusCode = 200;
      const expectedProperty = "token";

      const userCredentials = {
        email: mockUserCredentials.email,
        password: mockUserCredentials.password,
      };

      jwt.sign = jest.fn().mockReturnValue({
        token: "",
      });

      const response = await request(app)
        .post(endpoint)
        .send(userCredentials)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });

  describe("When it receives a request with name 'unregistered' and password 'iAmLost'", () => {
    test("Then it should respond with status 401 and an error message", async () => {
      const expectedStatusCode = 401;
      const inexistentUserName = "unregistered";
      const password = "iAmLost";
      const expectedResponse = {
        error:
          "The combination loginname and password is incorrect, please try again.",
      };

      const userCredentials = {
        username: inexistentUserName,
        password,
      };

      const response = await request(app)
        .post(endpoint)
        .send(userCredentials)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponse);
    });
  });
});
