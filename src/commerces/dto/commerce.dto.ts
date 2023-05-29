import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/;
const passFailMessage = {
  message:
    'password must be between 8 and 20 characters long and have at least a lowercase letter, an uppercase letter, a number and a special character',
};

export class CreateCommerceDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsString()
  @MinLength(3)
  openHours: string;

  @IsString()
  @MinLength(3)
  phoneNumber: string;

  @IsString()
  @MinLength(3)
  address: string;

  @IsString()
  @MinLength(6)
  user: string;

  @IsString()
  @Matches(passRegex, passFailMessage)
  password: string;
}

export class UpdateCommerceDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  description: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  openHours: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  address: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  user: string;

  @IsString()
  @IsOptional()
  @Matches(passRegex, passFailMessage)
  password: string;
}
