import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CreateCommerceDto, UpdateCommerceDto } from './dto/commerce.dto';

@Controller('commerces')
export class CommercesController {
  constructor(private commerceService: CommercesService) {}

  @Get()
  getAllCommerces() {
    return this.commerceService.getAllCommerces();
  }

  @Get('/:id')
  getCommerceById(@Param('id') id: string) {
    return this.commerceService.getCommerceById(id);
  }

  @Post()
  createCommerce(@Body() newCommerce: CreateCommerceDto) {
    return this.commerceService.createCommerce(newCommerce);
  }

  @Delete(':id')
  deleteCommerce(@Param('id') id: string) {
    return this.commerceService.deleteCommerce(id);
  }

  @Put(':id')
  updateCommerce(
    @Param('id') id: string,
    @Body() updatedFields: UpdateCommerceDto,
  ) {
    return this.commerceService.updateCommerce(id, updatedFields);
  }
}
