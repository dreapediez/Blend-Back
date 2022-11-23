import allowedOrigins from "./allowedOrigins";

describe("Given the function allowedOrigins", () => {
  describe("When it receives a parameter with an non-authorization url 'http://mareas.com'", () => {
    test("Then it should return an error with the text 'No authorization request origin'", () => {
      const nonAuthUrl = "http://mareas.com";
      const callBackMock = jest.fn().mockReturnThis();

      allowedOrigins(nonAuthUrl, callBackMock);
    });
  });
});
