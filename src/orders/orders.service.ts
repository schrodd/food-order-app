import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { NotFoundException } from '@nestjs/common';
import { TablesService } from 'src/tables/tables.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    private tablesService: TablesService,
  ) {}

  async create(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<Document> {
    //
    // TODO: Get actual state of products instead of the table object with only (id/qty)
    //
    const newOrder = new this.orderModel({
      commerceId: userId,
      ///////////
      ...createOrderDto,
    });
    return await newOrder.save();
  }

  async findAll(userId) {
    const orders = await this.orderModel.find({ commerceId: userId });
    if (orders.length < 1) throw new NotFoundException(`No orders found`);
    return orders;
  }

  async findOne(userId, orderNumber: number) {
    const order = await this.orderModel.findOne({
      commerceId: userId,
      orderNumber,
    });
    if (!order) throw new NotFoundException(`No order found`);
    return order;
  }

  /* update(userId, orderNumber: number, updateOrderDto: UpdateOrderDto) {
    return true;
  } */

  async remove(userId, orderNumber: number) {
    const order = await this.orderModel.findOneAndDelete({
      commerceId: userId,
      orderNumber,
    });
    if (!order) throw new NotFoundException(`No order found`);
    return order;
  }
}
