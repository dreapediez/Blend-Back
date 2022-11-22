import CustomError from "./CustomError";

describe("Give the class CustomError", () => {
  describe("When it is invoked with the message 'General error', an status code 400 and a public message 'Something went wrong'", () => {
    test("Then it should create an object with these three properties", () => {
      const expectedError = {
        message: "Something went wrong",
        statusCode: 400,
        publicMessage: "Something went wrong",
      };

      const expectedMessage = expectedError.message;
      const expectedCode = expectedError.statusCode;
      const expectedPublicMessage = expectedError.publicMessage;

      const newCustomError = new CustomError(
        expectedMessage,
        expectedCode,
        expectedPublicMessage
      );

      expect(newCustomError).toHaveProperty("message", expectedMessage);
      expect(newCustomError).toHaveProperty("statusCode", expectedCode);
      expect(newCustomError).toHaveProperty(
        "publicMessage",
        expectedPublicMessage
      );
    });
  });
});
