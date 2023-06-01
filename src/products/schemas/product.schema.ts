import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    stock: { type: Number },
    sku: { type: String },
    description: { type: String, default: 'Descripción de tu producto' },
    owner: { type: String, immutable: true },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);
