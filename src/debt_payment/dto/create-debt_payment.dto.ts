import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PaymentType } from "../entities/debt_payment.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDebtPaymentDto {
  @ApiProperty({ example: 1, description: 'Qarzingizning ID raqami' })
  @IsNumber()
  debtId: number;

  @ApiProperty({ example: '2025-06-01', description: 'To\'lov sanasi' })
  @IsString()
  @IsNotEmpty()
  payment_date: string;

  @ApiProperty({ example: 1500, description: 'To\'lov summasi' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 6, description: 'To\'lov oyning raqami' })
  @IsNumber()
  month: number;

  @ApiPropertyOptional({ example: 'Qo\'shimcha eslatma', description: 'To\'lovga oid izoh (ixtiyoriy)' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ example: PaymentType.CASH, enum: PaymentType, description: 'To\'lov turi' })
  @IsEnum(PaymentType)
  type: PaymentType;
}
