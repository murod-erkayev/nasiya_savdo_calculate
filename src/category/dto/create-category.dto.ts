import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsSemVer, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Elektronika', description: 'Kategoriya nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Turli elektron qurilmalar uchun kategoriya', description: 'Kategoriya tavsifi' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
