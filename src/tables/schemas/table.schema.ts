import { Schema } from 'mongoose';

export const TableSchema = new Schema(
  {
    owner: String,
    products: { type: Array, default: [] },
    safetyCode: { type: String, default: '0000' },
    tableNumber: { type: Number, default: 0, unique: true },
    status: { type: String, default: 'AVAILABLE' },
    hidden: { type: Boolean, default: true },
  },
  { timestamps: true },
);
