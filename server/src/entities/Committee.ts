import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Group } from "./Group";
import { Call } from "./Call";

@Entity({name:"committee"})
export class Committee {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    comiName: string;

    @ManyToOne(() => Group, (group) => group.user)
    group: Group;

    @OneToMany(() => Call, (call) => call.committee)
    call: Call[];

}
