import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Debt } from "../../debt/entities/debt.entity";
import { Notification } from "../../notification/entities/notification.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
    @ApiProperty({ example: 1, description: 'Mijozning ID raqami' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Ali', description: 'Mijozning ismi' })
    @Column()
    first_name: string;

    @ApiProperty({ example: 'Valiyev', description: 'Mijozning familiyasi' })
    @Column()
    last_name: string;

    @ApiProperty({ example: '+998901234567', description: 'Mijozning telefon raqami' })
    @Column()
    phone_number: string;

    @ApiProperty({ example: 'Toshkent sh., Amir Temur ko\'chasi, 12-uy', description: 'Mijozning manzili' })
    @Column()
    address: string;

    @ApiProperty({ example: '1234-5678-9012-3456', description: 'Mijozning karta raqami' })
    @Column()
    card: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Mijozning rasmi (URL)' })
    @Column()
    image: string;

    @OneToMany(() => Debt, (debt) => debt.customer)
    debt: Debt[];

    @OneToMany(() => Notification, (notification) => notification.customer)
    notification: Notification[];
}
