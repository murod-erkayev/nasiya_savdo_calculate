import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "../../shops/entities/shop.entity";
import { Category } from "../../category/entities/category.entity";
import { Inventor } from "../../inventor/entities/inventor.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1, description: 'Primary key ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Shop, description: 'Shop associated with the product' })
  @ManyToOne(() => Shop, shop => shop.product)
  shop: Shop;

  @ApiProperty({ type: () => Category, description: 'Category of the product' })
  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @ApiProperty({ example: 1234567890123, description: 'Model number as bigint' })
  @Column('bigint')
  model: number;

  @ApiProperty({ example: 15000.50, description: 'Total price of the product as decimal' })
  @Column('decimal')
  total_price: number;

  @ApiProperty({ example: 'This is a product description', description: 'Description text' })
  @Column('varchar')
  description: string;

  @ApiProperty({ example: 10, description: "rasim.png"})
  @Column()
  image: string;

  @ApiProperty({ type: () => [Inventor], description: 'List of related inventors' })
  @OneToMany(() => Inventor, (inventor) => inventor.product)
  inventor: Inventor[];
}
