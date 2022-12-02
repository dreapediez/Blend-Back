import { Types } from "mongoose";
import type { PostStructure } from "../server/types/calendarTypes";

export const postMock: PostStructure = {
  userId: new Types.ObjectId(),
  day: 1,
  title: "Pancake Stack",
  answer1: "Cinnamon",
  answer2: "Last Christmas - Wham!",
  answer3: "Fool - Christopher Moore",
  answer4:
    "The best tea to start the day. I have been able to enjoy it quietly while reading a book.",
  image:
    "https://c.ndtvimg.com/2021-06/2stfrfn8_tea_625x300_16_June_21.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350",
  imageBackup: "",
  createdAt: 28112022,
};

export const postsMock: PostStructure[] = [postMock];
