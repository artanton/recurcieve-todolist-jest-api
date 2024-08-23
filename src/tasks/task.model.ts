import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Set task text'],
    },
    date: {
      type: String,
      required: true,
    },
    subLevel: {
      type: Number,
      required: true,
    },
    parentId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export interface ITask {
  text: string;
  date: string;
  subLevel: number;
  parentId: string;
}
