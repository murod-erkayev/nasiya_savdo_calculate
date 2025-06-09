import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateInventorDto {
  @ApiProperty({ example: 1, description: 'Mahsulot ID si' })
  @IsInt({ message: 'productId butun son bo‘lishi kerak' })
  @Min(1, { message: 'productId 1 dan katta yoki teng bo‘lishi kerak' })
  productId: number;

  @ApiProperty({ example: 1, description: 'Do‘kon ID si' })
  @IsInt({ message: 'shopId butun son bo‘lishi kerak' })
  @Min(1, { message: 'shopId 1 dan katta yoki teng bo‘lishi kerak' })
  shopId: number;

  @ApiProperty({ example: 100, description: 'Mahsulot miqdori' })
  @IsInt({ message: 'quantity butun son bo‘lishi kerak' })
  @Min(0, { message: 'quantity manfiy bo‘lmasligi kerak' })
  quantity: number;
}
