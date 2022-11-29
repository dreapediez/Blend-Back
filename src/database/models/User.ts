import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const User = model("User", UserSchema, "users");

export default User;
