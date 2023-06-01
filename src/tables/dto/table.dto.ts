import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
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

export class UpdateTableDto extends PartialType(UpdateTableDtoProto) {
  @IsOptional()
  @IsIn([], { message: "ID's are not mutable" })
  _id: string;
}
