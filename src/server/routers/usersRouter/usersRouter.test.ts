import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import app from "../../app.js";
import User from "../../../database/models/User.js";
import connectDatabase from "../../../database/index.js";
import type { RegisterData, UserCredentials } from "../../types/userTypes.js";
import routes from "../routes.js";

let server: MongoMemoryServer;
const { registerRoute, loginRoute, usersRoute } = routes;

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
  describe("When it recevies a new user request with a username 'Leonidas', a password 'leo12345678' and an email 'leo@gmail.com'", () => {
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

  describe("When it receives a request with username: 'Leo', password: '123', email: leo@o.com that is not on the database", () => {
    test("Then it should respond with a code status 400 and the message: 'Bad request'", async () => {
      const expectedStatus = 400;
      const emptyData = {
        username: "Leo",
        email: "leo@o.com",
        password: "123",
      };

      const response = await request(app)
        .post(`${usersRoute}${registerRoute}`)
        .send(emptyData)
        .expect(expectedStatus);

      expect(response.status).toStrictEqual(expectedStatus);
    });
  });
});

describe("Given a POST /users/login endpoint", () => {
  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const userData: RegisterData = {
      username: "Leonidas",
      password: hashedPassword,
      email: "leonidas@gmail.com",
    };

    await User.create(userData);
  });

  describe("When it receives an existent user request with a username 'Leonidas' and password 'leo12345678'", () => {
    test("Then it should respond with a code status 200 and their corresponding token", async () => {
      const expectedStatus = 200;
      const userLogin: UserCredentials = {
        username: "Leonidas",
        password: userPassword,
      };

      const userToken = "accessToken";

      const response = await request(app)
        .post(`${usersRoute}${loginRoute}`)
        .send(userLogin)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(userToken);
    });
  });

  describe("When it receives an exitent user request with a username 'Leonidas' with a wrong password 'ups'", () => {
    test("Then it should respond with a code status 401", async () => {
      const expectedStatus = 401;
      const wrognUserLogin: UserCredentials = {
        username: "Leonidas",
        password: "ups",
      };

      await request(app)
        .post(`${usersRoute}${loginRoute}`)
        .send(wrognUserLogin)
        .expect(expectedStatus);
    });
  });

  describe("When it receives an unexistent user request with a username 'Jerjes' and password 'jerjes123'", () => {
    test("Then it should respond with a code status 401", async () => {
      const expectedStatus = 401;
      const wrognUserLogin: UserCredentials = {
        username: "Jerjes",
        password: "jerjes123",
      };

      await request(app)
        .post(`${usersRoute}${loginRoute}`)
        .send(wrognUserLogin)
        .expect(expectedStatus);
    });
  });

  describe("When it receives an empty request", () => {
    test("Then it should respond with a code status 401", async () => {
      const expectedStatus = 401;
      const emptyData: UserCredentials = {
        username: "",
        password: "",
      };

      await request(app)
        .post(`${usersRoute}${loginRoute}`)
        .send(emptyData)
        .expect(expectedStatus);
    });
  });
});
