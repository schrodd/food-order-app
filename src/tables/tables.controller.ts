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
import { TablesService } from './tables.service';
import { ManageProductsDto, UpdateTableDto } from './dto/table.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Request() req) {
    return this.tablesService.create(req.user.userId);
  }
  @Post('/manage-products/:tableNumber')
  manageProduct(
    @Request() req,
    @Param('tableNumber') tableNumber: number,
    @Body() addProductDto: ManageProductsDto,
  ) {
    return this.tablesService.manageProduct(
      req.user.userId,
      tableNumber,
      addProductDto,
    );
  }

  @Patch('change-safety-number/:tableNumber')
  changeSafetyNumber(
    @Request() req,
    @Param('tableNumber') tableNumber: number,
  ) {
    return this.tablesService.changeSafetyCode(req.user.userId, tableNumber);
  }

  @Get()
  findAll(@Request() req) {
    return this.tablesService.findAll(req.user.userId);
  }

  @Get(':tableNumber')
  findOne(@Request() req, @Param('tableNumber') tableNumber: number) {
    return this.tablesService.findOne(req.user.userId, tableNumber);
  }

  @Patch(':tableNumber')
  update(
    @Request() req,
    @Param('tableNumber') tableNumber: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return this.tablesService.update(
      req.user.userId,
      Number.parseInt(tableNumber),
      updateTableDto,
    );
  }

  @Delete(':tableNumber')
  remove(@Request() req, @Param('tableNumber') tableNumber: string) {
    return this.tablesService.remove(
      req.user.userId,
      Number.parseInt(tableNumber),
    );
  }
}
