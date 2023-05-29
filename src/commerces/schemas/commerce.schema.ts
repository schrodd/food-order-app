import { Schema } from 'mongoose';

const ProductSchema = new Schema({
  id: String,
  qty: Number,
});

const TableSchema = new Schema({
  tableNo: Number,
  products: [ProductSchema],
});

export const CommerceSchema = new Schema(
  {
    name: String,
    description: String,
    openHours: String,
    phoneNumber: String,
    address: String,
    tables: [TableSchema],
    user: String,
    password: String,
  },
  { timestamps: true },
);
