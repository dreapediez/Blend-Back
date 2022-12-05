import type { InferSchemaType } from "mongoose";
import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  day: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  answer1: {
    type: String,
    required: true,
  },
  answer2: {
    type: String,
    required: true,
  },
  answer3: {
    type: String,
    required: true,
  },
  answer4: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageBackup: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const Post = model("Post", PostSchema, "posts");

export type PostSchemaStructure = InferSchemaType<typeof PostSchema>;

export default Post;
