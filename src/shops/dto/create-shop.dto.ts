import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ example: 1, description: 'User ID who owns the shop' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'My Shop', description: 'Name of the shop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Main St, City', description: 'Shop address' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
