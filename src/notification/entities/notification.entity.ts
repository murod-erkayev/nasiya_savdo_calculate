import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Template } from "../../templates/entities/template.entity";
import { Customer } from "../../customer/entities/customer.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity('notification')
export class Notification {
  
  @ApiProperty({ example: 1, description: 'Notification ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Template, description: 'Notification template' })
  @ManyToOne(() => Template, template => template.notification)
  template: Template;

  @ApiProperty({ type: () => Customer, description: 'Customer who receives the notification' })
  @ManyToOne(() => Customer, customer => customer.notification)
  customer: Customer;

  @ApiProperty({ example: 'This is the notification message', description: 'Notification message text' })
  @Column()
  massage: string;
}
