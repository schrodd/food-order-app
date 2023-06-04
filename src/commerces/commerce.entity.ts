import { Document, ObjectId, Date } from 'mongoose';

export interface Commerce extends Document {
  _id: ObjectId;
  name: string;
  description: string;
  openHours: string;
  phoneNumber: string;
  address: string;
  tables: unknown[];
  user: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
