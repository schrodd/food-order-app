import { Document, ObjectId } from 'mongoose'

export enum tableStatus {
    AVAILABLE = 'AVAILABLE',
    OCCUPIED = 'OCCUPIED',
    RESERVED = 'RESERVED'
}

export interface Table extends Document {
    _id: ObjectId
    owner: string
    products: unknown[]
    safetyCode: string
    tableNumber: number
    status: tableStatus.AVAILABLE | tableStatus.OCCUPIED | tableStatus.RESERVED
}