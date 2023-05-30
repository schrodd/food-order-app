import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Commerce } from './commerce.entity';
import { CreateCommerceDto, UpdateCommerceDto } from './dto/commerce.dto';

@Injectable()
export class CommercesService {
  constructor(
    @InjectModel('Commerce')
    private commerceModel: Model<Commerce>,
  ) {}
  async getAllCommerces(): Promise<Commerce[]> {
    const commerces = await this.commerceModel.find();
    return commerces;
  }
  async getCommerceById(id: string): Promise<Commerce> {
    const commerce = await this.commerceModel.findById(id);
    if (!commerce) throw new NotFoundException(`id ${id} not found`);
    return commerce;
  }
  async getCommerceByUser(user: string): Promise<Commerce> {
    const commerce = await this.commerceModel.findOne({ user });
    if (!commerce) throw new NotFoundException(`user ${user} not found`);
    return commerce;
  }
  async createCommerce(newCommerce: CreateCommerceDto): Promise<Commerce> {
    const existingUser = await this.commerceModel.findOne({
      user: newCommerce.user,
    });
    if (existingUser) {
      throw new ForbiddenException(
        `user '${newCommerce.user}' is not available, please pick another`,
      );
    } else {
      const commerce = new this.commerceModel(newCommerce);
      return await commerce.save();
    }
  }
  async deleteCommerce(id: string): Promise<Commerce> {
    const deletedCommerce = await this.commerceModel.findByIdAndDelete(id);
    if (!deletedCommerce) throw new NotFoundException(`id ${id} not found`);
    return deletedCommerce;
  }
  async updateCommerce(
    id: string,
    updatedCommerce: UpdateCommerceDto,
  ): Promise<Commerce | string> {
    const commerce = await this.commerceModel.findByIdAndUpdate(
      id,
      updatedCommerce,
      {
        new: true,
      },
    );
    return commerce ? commerce : 'Commerce not found';
  }
}
