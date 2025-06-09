import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePinCodeDto {
  
  @ApiProperty({ example: 123, description: 'User ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '1234', description: 'Pin code string' })
  @IsString()
  @IsNotEmpty()
  pin_code: string;

  @ApiProperty({ example: true, description: 'Status of the pin code (active/inactive)' })
  @IsBoolean()
  status: boolean;
}
