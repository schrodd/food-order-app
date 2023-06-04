import { Schema } from 'mongoose';

export const OrderSchema = new Schema(
  {
    products: Array,
    orderNumber: Number,
    orderTotal: Number,
    clientName: String,
    clientDocument: String,
    commerceId: String,
    tableNumber: Number,
  },
  { timestamps: true },
);
