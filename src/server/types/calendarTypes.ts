import type { Types } from "mongoose";
import type { Request } from "express";

export interface CalendarStructure {
  userId: Types.ObjectId;
  isActive: boolean;
  createdAt: number;
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
  userId: Types.ObjectId;
  day: number;
  title: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  image: string;
  imageBackup: string;
  createdAt: number;
}

export interface PostCustomRequest extends Request {
  params: {
    postId: string;
  };
}

export interface PostCreateCustomRequest extends Request {
  userId: string;
  body: PostStructure;
}
