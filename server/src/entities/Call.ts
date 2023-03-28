import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";

import { Development } from "./Development";
import { Committee } from "./Committee";
import { Historic } from "./Historic";
import { User } from "./User";

@Entity({name:"call"})
export class Call {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 8})
    callType: string;

    @Column({nullable: false, length: 80})
    callTitle: string;

    @Column({nullable: false, length: 250})
    callDescription: string;

    @Column({nullable: true})
    callAttachments: number;

    @CreateDateColumn({ name: 'callDateCreate'})
    callDateCreate: Date;

    @Column({nullable: false, length: 40 })
    callProduct: string;

    @Column({nullable:true})
    callGroup: string;

    @OneToMany(() => Historic, (historic) => historic.call)
    historic: Historic[];

    @OneToMany(() => Development, (development) => development.call)
    development: Development[];

    @ManyToOne(() => Committee, (committee) => committee.id, {eager:true})
    committee: Committee;

    @ManyToOne(() => User, (user) => user.id, {eager:true})
    user: User;

}
