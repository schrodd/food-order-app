import { Schema } from 'mongoose'

export const TableSchema = new Schema(
    {
        owner: String,
        products: Array,
        safetyCode: String,
        tableNumber: Number,
        status: String
    }, { timestamps: true }
)