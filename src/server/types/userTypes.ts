import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
export interface UserCredentials {
  username: string;
  password: string;
}
export interface RegisterData extends UserCredentials {
  email: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export interface CustomRequest extends Request {
  userId: string;
}
