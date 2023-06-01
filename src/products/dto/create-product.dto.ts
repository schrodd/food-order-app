import { IsString, IsNumber, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(40)
  name: string;

  @IsString()
  @MaxLength(10)
  sku: string;

  @IsString()
  @MaxLength(200)
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}
