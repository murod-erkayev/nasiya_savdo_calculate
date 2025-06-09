import { Module } from '@nestjs/common';
import { InventorService } from './inventor.service';
import { InventorController } from './inventor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventor } from './entities/inventor.entity';
import { PruductsModule } from '../pruducts/pruducts.module';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Inventor
  ]), PruductsModule, ShopsModule],
  controllers: [InventorController],
  providers: [InventorService],
})
export class InventorModule {}
