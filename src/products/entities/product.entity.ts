import { Document, ObjectId, Date } from 'mongoose';

export interface Product extends Document {
  _id: ObjectId;
  owner: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  description: string;
  hidden: true | false;
  createdAt: Date;
  updatedAt: Date;
}
