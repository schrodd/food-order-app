import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from './table.entity'
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { CommercesService } from 'src/commerces/commerces.service';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel('Table') private tableModel: Model<Table>, private commercesService: CommercesService
  ) { }
  async create(newTable: CreateTableDto) {
    const exists = await this.commercesService.checkIfCommerceExists(newTable.owner)
    if (!exists) {
      throw new BadRequestException(`Commerce with ID ${newTable.owner} not found`)
    }
    const table = new this.tableModel(newTable)
    return await table.save()
  }

  findAll() {
    return `This action returns all tables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
