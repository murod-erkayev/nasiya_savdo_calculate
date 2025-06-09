import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  
  @ApiProperty({ example: 1, description: 'Notification template ID' })
  @IsNumber()
  templateId: number;

  @ApiProperty({ example: 123, description: 'Customer ID' })
  @IsNumber()
  customerId: number;

  @ApiProperty({ example: 'This is a notification message', description: 'Notification message text' })
  @IsString()
  @IsNotEmpty()
  massage: string;
}
