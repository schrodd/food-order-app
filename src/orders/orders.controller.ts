import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('')
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.userId, createOrderDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.userId);
  }

  @Get(':orderNumber')
  findOne(@Request() req, @Param('orderNumber') orderNumber: string) {
    return this.ordersService.findOne(
      req.user.userId,
      Number.parseInt(orderNumber),
    );
  }

  /* @Patch(':orderNumber')
  update(@Param('orderNumber') orderNumber: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+orderNumber, updateOrderDto);
  } */

  @Delete(':orderNumber')
  remove(@Request() req, @Param('orderNumber') orderNumber: string) {
    return this.ordersService.remove(
      req.user.userId,
      Number.parseInt(orderNumber),
    );
  }
}
