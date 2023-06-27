import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { tableStatus } from '../table.entity';

class UpdateTableDtoProto {
  @IsString()
  owner: string;

  @IsArray()
  products: { productId: string; qty: number }[];

  @IsNumber()
  @Min(1)
  @Max(99)
  tableNumber: number;

  @IsString()
  @IsIn(Array.from(Object.keys(tableStatus)))
  status: string;

  @IsBoolean()
  hidden: boolean;

  @IsString()
  @MaxLength(4)
  safetyCode: string;
}

export class UpdateTableDto extends PartialType(UpdateTableDtoProto) {}

export class ManageProductsDto {
  @IsString()
  productId: string;
  @IsNumber()
  //@Min(1)
  qty: number;
}
