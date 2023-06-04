import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './table.entity';
import { ManageProductsDto, UpdateTableDto } from './dto/table.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel('Table') private tableModel: Model<Table>,
    private productsService: ProductsService,
  ) {}

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
      { new: true },
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

  async manageProduct(
    userId: string,
    tableNumber: number,
    addProductDto: ManageProductsDto,
  ): Promise<Document> {
    // works with both positive and negative numbers
    const product = await this.productsService.idExists(
      userId,
      addProductDto.productId,
    );
    if (!product) throw new NotFoundException('Product does not exist');
    const table = await this.tableModel.findOne({ owner: userId, tableNumber });
    if (!table) throw new NotFoundException('Table does not exist');
    const existingProductIndex = table.products.findIndex(
      (e) => e.productId === addProductDto.productId,
    );
    if (existingProductIndex !== -1) {
      table.products[existingProductIndex].qty += addProductDto.qty;
    } else {
      table.products.push(addProductDto);
    }
    // clean less than one in qty
    table.products = table.products.filter((e) => e.qty > 0);
    return await this.update(userId, tableNumber, { products: table.products });
  }
}
