import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John', description: "Mijozning ismi" })
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: "Mijozning familiyasi" })
  last_name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+998901234567', description: "Telefon raqami" })
  phone_number: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Toshkent, Shayxontohur', description: "Manzil" })
  address: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1234-5678-9012-3456', description: "Kartaning raqami" })
  card: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'https://example.com/image.jpg', description: "Mijoz rasmi URL" })
  image: string;
}
