import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreateDebtDto {
  
  @ApiProperty({ example: 100000, description: 'Qarz miqdori' })
  @IsNumber()
  @IsPositive()
  amoun: number;

  @ApiProperty({ example: '2025-06-01', description: 'Qarz boshlanish sanasi' })
  @IsDateString()
  from_date: string;

  @ApiProperty({ example: '2025-06-30', description: 'Qarz tugash sanasi' })
  @IsDateString()
  to_date: string;

  @ApiProperty({ example: 'Bu qarz savdo uchun', description: 'Qarz tavsifi' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi (user) ID raqami' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2, description: 'Mijoz (customer) ID raqami' })
  @IsInt()
  customerId: number;
}
