import request from "supertest";
import app from "./app";

describe("Given a GET / endpoint", () => {
  describe("When it receives", () => {
    test("Then it should respond with a code status 200", async () => {
      const expectedStatus = 200;

      await request(app).get("/").expect(expectedStatus);
    });
  });
});
