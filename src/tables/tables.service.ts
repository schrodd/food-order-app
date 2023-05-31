import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './table.entity';
import { UpdateTableDto } from './dto/table.dto';
import { Document } from 'mongoose';

@Injectable()
export class TablesService {
  constructor(@InjectModel('Table') private tableModel: Model<Table>) {}
  async create(userId: string): Promise<Document> {
    const safeTableNumber = await this.findSafeTableNumber(userId);
    const table = new this.tableModel({
      owner: userId,
      tableNumber: safeTableNumber,
      safetyCode: this.createSafetyCode(),
    });
    return await table.save();
  }

  async findAll(userId: string) {
    return await this.tableModel.find({ owner: userId });
  }

  async findOne(userId: string, tableNumber: number) {
    const table = await this.tableModel.findOne({
      owner: userId,
      tableNumber: tableNumber,
    });
    if (!table)
      throw new NotFoundException(
        `User id ${userId} doesnt own a table #${tableNumber}`,
      );
    return table;
  }

  async update(
    userId: string,
    tableNumber: number,
    updateTableDto: UpdateTableDto,
  ) {
    try {
      const updatedTable = await this.tableModel.findOneAndUpdate(
        { owner: userId, tableNumber },
        updateTableDto,
        { new: true },
      );
      if (!updatedTable) {
        throw new NotFoundException(`Table #${tableNumber} not found`);
      }
      return updatedTable;
    } catch (error) {
      throw new ConflictException(`Table #${tableNumber} already exists`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
  async findSafeTableNumber(userId): Promise<number> {
    const tables = await this.findAll(userId);
    const occupiedTableNumbers = tables.map((e) => e.tableNumber);
    let safe = 1;
    for (let i = 1; i <= 99; i++) {
      if (occupiedTableNumbers.includes(i)) {
        safe++;
      } else break;
    }
    return safe;
  }
  createSafetyCode(): string {
    const length = 4;
    let s = '';
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length).toUpperCase();
  }
}
