import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { DeniedArchive } from "./DeniedArchive";
import { Development } from "./Development";
import { Committee } from "./Committee";
import { Historic } from "./Historic";

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

    @CreateDateColumn({nullable: false, length: 40})
    callProduct: Date;

    @CreateDateColumn({nullable: false, length: 40})
    callClient: Date;

    @OneToMany(() => Historic, (historic) => historic.call)
    historic: Historic[];

    @OneToMany(() => Development, (development) => development.call)
    development: Development[];

    @ManyToOne(() => Committee, (committee) => committee.id)
    committee: Committee;

}
