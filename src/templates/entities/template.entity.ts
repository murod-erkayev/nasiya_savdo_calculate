import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/scheam/user.entity";
import { Notification } from "../../notification/entities/notification.entity";

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Template ID' })
  id: number;

  @ManyToOne(() => User, user => user.template)
  @ApiProperty({ type: () => User, description: 'Template owner user' })
  user: User;

  @Column('text')
  @ApiProperty({ example: 'Welcome to our service!', description: 'Template text content' })
  text: string;

  @Column('boolean')
  @ApiProperty({ example: true, description: 'Indicates if the template is active' })
  is_active: boolean;

  @OneToMany(() => Notification, (notification) => notification.customer)
  @ApiProperty({ type: () => [Notification], description: 'List of notifications associated with this template' })
  notification: Notification[];
}
