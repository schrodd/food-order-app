import {
  IsString,
  IsNumber,
  MaxLength,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  sku: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}
