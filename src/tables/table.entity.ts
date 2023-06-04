import { Document, ObjectId, Date } from 'mongoose';

export enum tableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
}

interface TableProduct {
  productId: string;
  qty: number;
}

export interface Table extends Document {
  _id: ObjectId;
  owner: string;
  products: TableProduct[];
  safetyCode: string;
  tableNumber: number;
  status: tableStatus.AVAILABLE | tableStatus.OCCUPIED | tableStatus.RESERVED;
  createdAt: Date;
  updatedAt: Date;
}
