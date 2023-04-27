import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name:"group"})

export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 80})
    groupName: string;


    @ManyToMany(() => User)
    @JoinTable()
    user: User[]

}