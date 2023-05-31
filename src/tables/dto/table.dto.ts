import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { tableStatus } from '../table.entity';

class UpdateTableDtoProto {
  @IsString()
  owner: string;

  @IsArray()
  products: unknown[];

  @IsString()
  safetyCode: string;

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
