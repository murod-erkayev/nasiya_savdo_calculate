import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { CustomerModule } from '../customer/customer.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Debt
  ]),CustomerModule, UsersModule],
  controllers: [DebtController],
  providers: [DebtService],
  exports:[DebtService]
})
export class DebtModule {}
