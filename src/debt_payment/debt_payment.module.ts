import { Module } from '@nestjs/common';
import { DebtPaymentService } from './debt_payment.service';
import { DebtPaymentController } from './debt_payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtPayment } from './entities/debt_payment.entity';
import { DebtModule } from '../debt/debt.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    DebtPayment
  ]), DebtModule],
  controllers: [DebtPaymentController],
  providers: [DebtPaymentService],
})
export class DebtPaymentModule {}
