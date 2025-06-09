import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: 'admin123',
    description: 'Administrator nomi',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Administrator telefon raqami',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Administrator email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Parol (kamida 6 belgidan iborat bo‘lishi tavsiya etiladi)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Tasdiqlovchi parol',
  })
  @IsString()
  @IsNotEmpty()
  confrim_password: string;

  @ApiProperty({
    example: 'some_hashed_refresh_token_here',
    description: 'Refresh tokenning xeshlangan ko‘rinishi',
    required: false,
  })
  @IsString()
  hashed_refresh_token: string;
}
