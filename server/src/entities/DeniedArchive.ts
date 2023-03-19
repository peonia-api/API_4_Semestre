import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";


import { Call } from "./Call";

@Entity({name:"deniedArchive"})
export class DeniedArchive {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 4})
    archiveType: string;

    @Column({nullable: false, length: 15})
    archiveState: string;

    @CreateDateColumn({ name: 'callFinishedDate'})
    callFinishedDate: Date;

    @ManyToOne(() => Call, (call) => call.id)
    call: Call;
  
}
