import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  @IsPositive()
  userId: number;

  @ApiProperty({ example: 1, description: 'Shop ID' })
  @IsNumber()
  @IsPositive()
  shopId: number;

  @ApiProperty({ example: 1000, description: 'Initial balance of the wallet' })
  @IsNumber()
  balance: number;
}
