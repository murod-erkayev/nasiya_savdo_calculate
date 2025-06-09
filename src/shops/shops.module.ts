import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { UsersModule } from '../users/users.module';
import { Inventor } from '../inventor/entities/inventor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Shop, Inventor
  ]), UsersModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports:[ShopsService]
})
export class ShopsModule {}
