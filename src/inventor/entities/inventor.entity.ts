import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../pruducts/entities/pruduct.entity";
import { Shop } from "../../shops/entities/shop.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Inventor {
    @ApiProperty({ example: 1, description: 'Inventor ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 100, description: 'Mahsulot miqdori' })
    @Column({ type: "decimal" })
    quantity: number;

    @ApiProperty({ type: () => Product, description: 'Bog‘langan mahsulot' })
    @ManyToOne(() => Product, (product) => product.inventor)
    product: Product;

    @ApiProperty({ type: () => Shop, description: 'Bog‘langan do‘kon' })
    @ManyToOne(() => Shop, (shop) => shop.inventor)
    shop: Shop;
}
