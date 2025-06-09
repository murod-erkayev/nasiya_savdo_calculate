import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './scheam/user.entity';
import { MailModule } from '../mail/mail.module';
import { Debt } from '../debt/entities/debt.entity';
import { Shop } from '../shops/entities/shop.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    User,Debt, Shop
   ]),MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
