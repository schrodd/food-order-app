import { Schema } from 'mongoose';

export const CommerceSchema = new Schema(
  {
    name: String,
    description: String,
    openHours: String,
    phoneNumber: String,
    address: String,
    tables: Array,
    user: String,
    password: String,
  },
  { timestamps: true },
);
