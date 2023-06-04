import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  tableNumber: number;

  @IsString()
  clientName: string;

  @IsString()
  clientDocument: string;
}
