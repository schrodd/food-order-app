import { Schema } from 'mongoose';

export const TableSchema = new Schema(
  {
    owner: { type: String, immutable: true },
    products: { type: Array, default: [] },
    safetyCode: { type: String, default: '0000' },
    tableNumber: { type: Number, immutable: true },
    status: { type: String, default: 'AVAILABLE' },
    hidden: { type: Boolean, default: true },
  },
  { timestamps: true },
);
