import { Document, ObjectId } from 'mongoose';

export interface Product extends Document {
  _id: ObjectId;
  owner: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  description: string;
  hidden: true | false;
}
