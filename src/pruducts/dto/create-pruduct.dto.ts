import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePruductDto {
  @ApiProperty({ example: 1, description: 'Shop ID' })
  @IsNumber()
  @Type(() => Number)  // Shu qatorni qo‘shing
  shopId: number;

  @ApiProperty({ example: 2, description: 'Category ID' })
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  @ApiProperty({ example: 123, description: 'Model number' })
  @IsNumber()
  @Type(() => Number)
  model: number;

  @ApiProperty({ example: 15000, description: 'Total price of the product' })
  @IsNumber()
  @Type(() => Number)
  total_price: number;

  @ApiProperty({ example: 'Product description', description: 'Description of the product' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'rasim.png', description: 'Image filename or URL' })
  image: string;
}
