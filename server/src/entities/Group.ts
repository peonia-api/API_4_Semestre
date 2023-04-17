import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { Committee } from "./Committee";

@Entity({name:"group"})
export class Group {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    groupName: string;

    @ManyToMany(() => User)
    @JoinTable()
    user: User[]

    @ManyToOne(() => Committee, (committee) => committee.group, {eager:true})
    committee: Committee;

}
