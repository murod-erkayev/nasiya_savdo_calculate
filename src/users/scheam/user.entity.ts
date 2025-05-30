import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "../../image/entities/image.entity";
import { Role } from "../../common/enum/user-role.enum";
import { v4 as uuid } from 'uuid';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    email: string;
    @Column({ nullable: true })
    phone_number: string;
    @Column()
    hashed_password: string;

    @ManyToOne(()=>Image , (image)=>image.user)
    image:Image

    @Column({default:" "})
    hashed_refresh_token: string;
    @Column({ default: false })
    is_active: boolean;
    @Column({
        type:"enum",
        enum:Role,
        default:Role.SOTUVCHI
    })
    role:Role
    @Column()
    activation_link: string;
}
