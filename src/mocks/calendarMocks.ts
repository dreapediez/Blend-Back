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

export const postsMock: PostStructure[] = [
  {
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
    createdAt: 1669971621,
  },
  {
    userId: new Types.ObjectId(),
    day: 2,
    title: "Toffee Apple",
    answer1: "",
    answer2: "Not Today - Imagine Dragons",
    answer3: "Mr. Mercedes - Stephen King",
    answer4:
      "It's perfect to drink at afternoon while your are relaxed on the sofa.",
    image:
      "https://cdn.shopify.com/s/files/1/0054/9811/0003/files/herbal_tea_2.jpg?v=1619841195",
    imageBackup: "",
    createdAt: 1669971600,
  },
];
