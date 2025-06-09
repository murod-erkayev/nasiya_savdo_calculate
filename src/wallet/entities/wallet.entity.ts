import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/scheam/user.entity";
import { Shop } from "../../shops/entities/shop.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Wallet {
    @ApiProperty({ example: 1, description: 'Wallet ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => User, description: 'Wallet egasi bo‘lgan foydalanuvchi' })
    @ManyToOne(() => User, (user) => user.wallet)
    user: User;

    @ApiProperty({ type: () => Shop, description: 'Wallet bog‘langan do‘kon (shop)' })
    @ManyToOne(() => Shop, (shop) => shop.wallet)
    shop: Shop;

    @ApiProperty({ example: 1000.50, description: 'Wallet balansi', type: 'number', format: 'decimal' })
    @Column({
        type: "decimal"
    })
    balance: number;
}
