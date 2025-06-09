import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/scheam/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PinCode {

  @ApiProperty({ example: 1, description: 'Primary key ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User, description: 'User associated with the pin code' })
  @ManyToOne(() => User, (user) => user.pin_code)
  user: User;

  @ApiProperty({ example: '1234', description: 'Pin code string' })
  @Column()
  pin_code: string;

  @ApiProperty({ example: true, description: 'Status of the pin code (active or not)' })
  @Column({ type: 'boolean' })
  status: boolean;
}
