import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'This is a template text', description: 'Text content of the template' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: true, description: 'Template active status' })
  @IsBoolean()
  is_active: boolean;
}
