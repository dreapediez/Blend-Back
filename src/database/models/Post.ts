import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  day: {
    type: Number,
  },
  title: {
    type: String,
  },
  answer1: {
    type: String,
  },
  answer2: {
    type: String,
  },
  answer3: {
    type: String,
  },
  answer4: {
    type: String,
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

export default Post;
