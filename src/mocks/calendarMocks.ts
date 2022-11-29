import { Types } from "mongoose";
import type { CalendarStructure } from "../server/types/calendarTypes";

export const calendarMock: CalendarStructure = {
  userId: new Types.ObjectId(),
  isActive: true,
  createdAt: "28112022",
  windows: [
    {
      isOpen: false,
      title: "1. Pancake Stack",
      teaType: "Black tea",
      brewed: "Good with or without milk. ",
      ingredients:
        "Calendula, sunflower, jasmine petals, natural flavours and real maple syrup.",
      time: 3,
      temperature: 100,
      post: {
        answer1: "Cinnamon",
        answer2: "Last Christmas - Wham!",
        answer3: "Fool - Christopher Moore",
        answer4:
          "The best tea to start the day. I have been able to enjoy it quietly while reading a book.",
        image:
          "https://c.ndtvimg.com/2021-06/2stfrfn8_tea_625x300_16_June_21.jpg?im=FaceCrop,algorithm=dnn,width=620,height=350",
        imageBackup: "",
        createdAt: "28112022",
      },
    },
  ],
};

export const calendarsMock: CalendarStructure[] = [calendarMock];
