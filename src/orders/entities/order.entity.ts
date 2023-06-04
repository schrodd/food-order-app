import { Document, ObjectId, Date } from 'mongoose';

export interface Order extends Document {
  _id: ObjectId;
  products: unknown[];
  orderNumber: number;
  orderTotal: number;
  clientName: string;
  clientDocument: string;
  createdAt: Date;
  updatedAt: Date;
}
