import { Document, ObjectId } from 'mongoose';

interface Product {
  _id: ObjectId;
  id: string;
  qty: number;
}

interface Table {
  _id: ObjectId;
  tableNo: number;
  products: Product;
}

export interface Commerce extends Document {
  _id: ObjectId;
  name: string;
  description: string;
  openHours: string;
  phoneNumber: string;
  address: string;
  tables: Table;
  user: string;
  password: string;
}
