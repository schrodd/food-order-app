import {
  Allow,
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { tableStatus } from '../table.entity';
import { TablesService } from '../tables.service';

class UpdateTableDtoProto {
  @IsString()
  owner: string;

  @IsArray()
  products: unknown[];

  @IsNumber()
  @Min(1)
  @Max(99)
  tableNumber: number;

  @IsString()
  @IsIn(Array.from(Object.keys(tableStatus)))
  status: string;

  @IsBoolean()
  hidden: boolean;
}

export class UpdateTableDto extends PartialType(UpdateTableDtoProto) {}
