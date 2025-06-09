import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Debt } from '../../debt/entities/debt.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentType {
  CASH = 'cash',
  TRANSFER = 'click',
}

@Entity()
export class DebtPayment {
  @ApiProperty({ example: 1, description: 'To‘lovning yagona identifikatori (ID)' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Debt, description: 'Qarzni ifodalovchi entity' })
  @ManyToOne(() => Debt, (debt) => debt.debt_payment)
  debt: Debt;

  @ApiProperty({ example: '2025-06-01', description: 'To‘lov sanasi' })
  @Column()
  payment_date: string; 

  @ApiProperty({ example: 1500.75, description: 'To‘lov summasi (decimal)' })
  @Column({ type: 'decimal' })
  amount: number;

  @ApiProperty({ example: 6, description: 'To‘lov oyning raqami' })
  @Column()
  month: number;

  @ApiProperty({ example: 'Qo‘shimcha eslatma', description: 'To‘lovga oid izoh' })
  @Column()
  note: string;

  @ApiProperty({ example: PaymentType.CASH, enum: PaymentType, description: 'To‘lov turi' })
  @Column({
    type: 'enum',
    enum: PaymentType,
  })
  type: PaymentType;
}
