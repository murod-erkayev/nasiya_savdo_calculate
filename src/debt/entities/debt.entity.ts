import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "../../users/scheam/user.entity";
import { Customer } from "../../customer/entities/customer.entity";
import { DebtPayment } from "../../debt_payment/entities/debt_payment.entity";

@Entity()
export class Debt {
    @ApiProperty({ example: 1, description: 'Qarzning ID raqami' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 150000, description: 'Qarz miqdori' })
    @Column({
        type: "decimal"
    })
    amoun: number;

    @ApiProperty({ example: '2025-06-01', description: 'Qarz boshlanish sanasi' })
    @Column()
    from_date: string;

    @ApiProperty({ example: '2025-06-30', description: 'Qarz tugash sanasi' })
    @Column()
    to_date: string;

    @ApiProperty({ example: 'Qarz savdo uchun', description: 'Qarz tavsifi' })
    @Column()
    description: string;

    //=====Relitions=====
    @ManyToOne(() => User, (user) => user.debt)
    user: User;

    @ManyToOne(() => Customer, (customer) => customer.debt)
    customer: Customer;

    @OneToMany(() => DebtPayment, (debt_payment) => debt_payment.debt)
    debt_payment: DebtPayment[];
  total_amount: any;
}
