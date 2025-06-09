import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../common/enum/user-role.enum";
import { v4 as uuid } from 'uuid';
import { Debt } from "../../debt/entities/debt.entity";
import { Shop } from "../../shops/entities/shop.entity";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { Template } from "../../templates/entities/template.entity";
import { PinCode } from "../../pin-code/entities/pin-code.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty({ example: 1, description: 'User ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @Column()
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    @Column()
    last_name: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the user' })
    @Column()
    email: string;

    @ApiProperty({ example: '+998901234567', description: 'Phone number of the user', nullable: true })
    @Column({ nullable: true })
    phone_number: string;

    @ApiProperty({ example: 'hashed_password_example', description: 'Hashed password of the user' })
    @Column()
    hashed_password: string;

    @ApiProperty({ example: 'https://example.com/image.png', description: 'URL or path to user image' })
    @Column()
    image: string;

    @ApiProperty({ example: 'hashed_refresh_token_example', description: 'Hashed refresh token', default: " " })
    @Column({type: 'text', nullable: true})
    hashed_refresh_token: string |null

    @ApiProperty({ example: false, description: 'User activation status' })
    @Column({ default: false })
    is_active: boolean;

    @ApiProperty({ enum: Role, example: Role.SOTUVCHI, description: 'Role of the user' })
    @Column({
        type: "enum",
        enum: Role,
        default: Role.SOTUVCHI
    })
    role: Role;

    @ApiProperty({ example: 'uuid-activation-link-example', description: 'Activation link UUID' })
    @Column()
    activation_link: string;

    @ApiProperty({ type: () => [Debt], description: 'User debts', isArray: true })
    @OneToMany(() => Debt, (debt) => debt.user)
    debt: Debt[];

    @ApiProperty({ type: () => [Shop], description: 'User shops', isArray: true })
    @OneToMany(() => Shop, (shop) => shop.user)
    shop: Shop[];

    @ApiProperty({ type: () => [Wallet], description: 'User wallets', isArray: true })
    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallet: Wallet[];

    @ApiProperty({ type: () => [Template], description: 'User templates', isArray: true })
    @OneToMany(() => Template, (template) => template.user)
    template: Template[];

    @ApiProperty({ type: () => [PinCode], description: 'User pin codes', isArray: true })
    @OneToMany(() => PinCode, (pin_code) => pin_code.user)
    pin_code: PinCode[];
}
