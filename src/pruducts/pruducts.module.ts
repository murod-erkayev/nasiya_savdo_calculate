import { Module } from '@nestjs/common';
import { PruductsController } from './pruducts.controller';
import { ProductService } from './pruducts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/pruduct.entity';
import { Category } from '../category/entities/category.entity';
import { ShopsModule } from '../shops/shops.module';
import { CategoryModule } from '../category/category.module';
import { Inventor } from '../inventor/entities/inventor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Product, Category, Inventor
  ]),ShopsModule, CategoryModule],
  controllers: [PruductsController],
  providers: [ProductService],
  exports:[ProductService]
})
export class PruductsModule {}
