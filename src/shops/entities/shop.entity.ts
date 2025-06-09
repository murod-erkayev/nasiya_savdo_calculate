import { Inventor } from './../../inventor/entities/inventor.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/scheam/user.entity";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { Product } from "../../pruducts/entities/pruduct.entity";
import { Reports } from '../../report/entities/report.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Shop {
    @ApiProperty({ example: 1, description: 'Unique identifier for the shop' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: () => User, description: 'User who owns this shop' })
    @ManyToOne(() => User, (user) => user.shop)
    user: User;

    @ApiProperty({ example: 'My Shop', description: 'Name of the shop' })
    @Column()
    name: string;

    @ApiProperty({ example: '123 Main St, City', description: 'Address of the shop' })
    @Column()
    address: string;

    @ApiProperty({ type: () => [Wallet], description: 'Wallets related to this shop' })
    @OneToMany(() => Wallet, (wallet) => wallet.shop)
    wallet: Wallet;

    @ApiProperty({ type: () => [Product], description: 'Products available in this shop' })
    @OneToMany(() => Product, (product) => product.shop)
    product: Product;

    @ApiProperty({ type: () => [Inventor], description: 'Inventors related to this shop' })
    @OneToMany(() => Inventor, (inventor) => inventor.shop)
    inventor: Inventor;

    @ApiProperty({ type: () => [Reports], description: 'Reports related to this shop' })
    @OneToMany(() => Reports, (reports) => reports.shop)
    reports: Reports;
}
