import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommercesService } from './commerces.service';
import { CreateCommerceDto, UpdateCommerceDto } from './dto/commerce.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('commerces')
export class CommercesController {
  constructor(private commerceService: CommercesService) {}

  @Get()
  getAllCommerces() {
    return this.commerceService.getAllCommerces();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-data')
  getCommerceByAuthOwner(@Request() req) {
    return this.commerceService.getCommerceById(req.user.userId);
  }

  @Get('/id/:id')
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
