import { Types } from "mongoose";
import type { UserCredentials } from "../server/types/userTypes";

export const userMock: UserCredentials = {
  username: "leo",
  password: "leo123",
};

export const userMockWithId = {
  username: "leo",
  password: "leo123",
  _id: "155654rrd",
};

export const userMockCredentials = {
  username: "leo",
  password: "leo123",
  email: "leo@gmail.com",
  _id: new Types.ObjectId(),
};

export const mockToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzE0N2E3ZDgzNzlkOTUzNzVjNTE2ZCIsInVzZXJuYW1lIjoicGFjbyIsImlhdCI6MTY2ODQ0OTEwNCwiZXhwIjoxNjY4NjIxOTA0fQ.0evbXb4KnA1Ojdehw52UQUV4nHEW5nvPr7OHUqDKtqo";
