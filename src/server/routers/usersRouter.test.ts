import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import app from "../app.js";
import User from "../../database/models/User.js";
import connectDatabase from "../../database/index.js";
import type { RegisterData } from "../types/userTypes.js";
import routes from "./routes.js";

let server: MongoMemoryServer;
const { registerRoute, usersRoute } = routes;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

const userPassword = "leo12345678";

describe("Given a POST /users/register endpoint", () => {
  describe("When it recevies a new user request with a username 'Leonidas', a password 'leo123' and an email 'leo@gmail.com'", () => {
    test("Then it should respond with a code status 201 and an encrypted password", async () => {
      const expectedStatus = 201;

      const userData = {
        username: "Leonidas",
        password: userPassword,
        email: "leo@gmail.com",
      };

      await request(app)
        .post(`${usersRoute}${registerRoute}`)
        .send(userData)
        .expect(expectedStatus);
    });
  });

  describe("When it receives a new request with a username that already exists", () => {
    let userData: RegisterData;
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      userData = {
        username: "Leonidas",
        password: hashedPassword,
        email: "leo@gmail.com",
      };
      await User.create(userData);
    });

    test("Then it sould return a response with status 409", async () => {
      const conflictStatus = 409;
      const newUserData: RegisterData = {
        username: "Leonidas",
        password: userPassword,
        email: "leonidas@gmail.com",
      };

      await request(app)
        .post(`${usersRoute}${registerRoute}`)
        .send(newUserData)
        .expect(conflictStatus);
    });
  });
});
