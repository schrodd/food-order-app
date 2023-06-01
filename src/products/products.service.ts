import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(
    userId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    if (await this.skuExists(userId, createProductDto.sku)) {
      throw new ConflictException(`Sku ${createProductDto.sku} already exists`);
    }
    const prodWithOwner = { owner: userId, ...createProductDto };
    const newProduct = new this.productModel(prodWithOwner);
    return await newProduct.save();
  }

  async findAll(userId: string): Promise<Product[]> {
    const products = await this.productModel.find({ owner: userId });
    if (products.length < 1)
      throw new NotFoundException(`${userId} doesn't own any products`);
    return products;
  }

  async findOne(userId: string, sku: string): Promise<Product> {
    const product = await this.productModel.findOne({ owner: userId, sku });
    if (!product)
      throw new NotFoundException(`Product with sku ${sku} not found`);
    return product;
  }

  async update(
    userId: string,
    sku: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProd = await this.productModel.findOneAndUpdate(
      { owner: userId, sku },
      updateProductDto,
      { new: true },
    );
    if (!updatedProd) {
      throw new NotFoundException(`Product with sku ${sku} not found`);
    }
    return updatedProd;
  }

  async remove(userId: string, sku: string): Promise<Product> {
    const deletedProd = await this.productModel.findOneAndDelete({
      owner: userId,
      sku,
    });
    if (!deletedProd) {
      throw new NotFoundException(`Product with sku ${sku} not found`);
    }
    return deletedProd;
  }
  async skuExists(userId: string, sku: string): Promise<boolean> {
    // checks if this commerce already owns a product with sku = [sku]
    // multiple commerces can have the same sku in one of their products
    const exists = await this.productModel.findOne({ owner: userId, sku });
    return exists ? true : false;
  }
}
