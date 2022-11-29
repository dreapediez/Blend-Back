import type { Types } from "mongoose";

export interface CalendarStructure {
  userId: Types.ObjectId;
  isActive: boolean;
  createdAt: string;
  windows: WindowStructure[];
}

export interface WindowStructure {
  isOpen: boolean;
  title: string;
  teaType: string;
  brewed: string;
  ingredients: string;
  time: number;
  temperature: number;
  post: PostStructure;
}

export interface PostStructure {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  image: string;
  imageBackup: string;
  createdAt: string;
}
