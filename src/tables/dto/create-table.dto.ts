import { tableStatus } from "../table.entity"
import { Equals, IsIn, IsNumber, IsOptional, IsString, Length, Matches, Max, Min } from 'class-validator'

export class CreateTableDto {
    @IsString()
    @Length(24)
    owner: string

    @IsOptional()
    products: unknown[]

    @IsString()
    @Length(4)
    safetyCode: string

    @Min(1)
    @Max(99)
    @IsNumber()
    tableNumber: number

    @IsString()
    @IsIn(Array.from(Object.keys(tableStatus)))
    status: string
}
