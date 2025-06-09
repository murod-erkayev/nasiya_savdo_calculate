import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Product } from "../../pruducts/entities/pruduct.entity";

@Entity('category')
export class Category {
  @ApiProperty({ example: 1, description: 'Kategoriya ID raqami' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Elektronika', description: 'Kategoriya nomi' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Turli elektron qurilmalar uchun kategoriya', description: 'Kategoriya tavsifi' })
  @Column()
  description: string;

  @ApiProperty({ type: () => [Product], description: 'Kategoriyaga tegishli mahsulotlar' })
  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
