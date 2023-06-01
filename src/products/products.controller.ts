import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(req.user.userId, createProductDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.productsService.findAll(req.user.userId);
  }

  @Get(':sku')
  findOne(@Request() req, @Param('sku') sku: string) {
    return this.productsService.findOne(req.user.userId, sku);
  }

  @Patch(':sku')
  update(
    @Request() req,
    @Param('sku') sku: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(req.user.userId, sku, updateProductDto);
  }

  @Delete(':sku')
  remove(@Request() req, @Param('sku') sku: string) {
    return this.productsService.remove(req.user.userId, sku);
  }
}
