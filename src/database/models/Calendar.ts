import { model, Schema } from "mongoose";

const WindowSchema = new Schema({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  teaType: {
    type: String,
    required: true,
  },
  brewed: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  post: {
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
  },
});

const CalendarSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  windows: [WindowSchema],
});

const Calendar = model("Calendar", CalendarSchema, "calendars");

export default Calendar;
