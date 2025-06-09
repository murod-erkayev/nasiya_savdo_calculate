import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { UsersModule } from '../users/users.module';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Wallet
  ]), UsersModule, ShopsModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
