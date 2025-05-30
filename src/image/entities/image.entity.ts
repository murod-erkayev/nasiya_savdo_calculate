import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/scheam/user.entity";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(()=>User,(user)=>user.image)
    user:User
}
