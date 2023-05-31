import { ObjectId } from 'mongoose'

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