import { Schema } from 'mongoose';

const TableProductSchema = new Schema({
  productId: { type: String, require: true, unique: true },
  qty: { type: Number, require: true },
});

export const TableSchema = new Schema(
  {
    owner: { type: String, immutable: true },
    products: { type: [TableProductSchema], default: [] },
    safetyCode: { type: String, default: '0000' },
    tableNumber: { type: Number, immutable: true },
    status: { type: String, default: 'AVAILABLE' },
    hidden: { type: Boolean, default: true },
  },
  { timestamps: true },
);
