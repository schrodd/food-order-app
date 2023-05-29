import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  status: { type: String, required: true },
});
