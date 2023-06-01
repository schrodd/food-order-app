import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(userId: string): Promise<Table[]> {
    return await this.tableModel.find({ owner: userId });
  }

  async findOne(userId: string, tableNumber: number): Promise<Table> {
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
  ): Promise<Table> {
    const updatedTable = await this.tableModel.findOneAndUpdate(
      { owner: userId, tableNumber },
      updateTableDto,
    );
    if (!updatedTable)
      throw new NotFoundException(
        `User id ${userId} doesnt own a table #${tableNumber}`,
      );
    return updatedTable;
  }

  async remove(userId: string, tableNumber: number): Promise<Table> {
    const deletedTable = await this.tableModel.findOneAndDelete({
      owner: userId,
      tableNumber,
    });
    if (!deletedTable)
      throw new NotFoundException(
        `User id ${userId} doesnt own a table #${tableNumber}`,
      );
    return deletedTable;
  }
  async findSafeTableNumber(userId: string): Promise<number> {
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
