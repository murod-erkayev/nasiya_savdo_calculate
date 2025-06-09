import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Admin {
  @ApiProperty({ example: 1, description: 'Administratorning ID raqami' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'admin123', description: 'Administrator nomi' })
  @Column({unique:true})
  username: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @Column({unique:true})

  phone_number: string

  @ApiProperty({ example: 'admin@example.com', description: 'Email manzili' })
  @Column()

  email: string;

  @ApiProperty({ example: 'hashed_password_here', description: 'Xavfsiz (hashed) parol' })
  @Column()

  hashed_password: string;

  @ApiProperty({ example: true, description: 'Faollik holati' })
  @Column({default:false})
  is_active: boolean;

  @ApiProperty({ example: false, description: 'Yaratuvchimi?' })
  @Column({default:"admin"})
  role: string;

  @ApiProperty({ example: 'hashed_refresh_token_here', description: 'Hashed refresh token' })
  @Column({type:'text',nullable:true})
  hashed_refresh_token: string | null

  @ApiProperty({ example: 'uuid-activation-link', description: 'Aktivatsiya linki' })
  @Column()

  activation_link: string;
}
