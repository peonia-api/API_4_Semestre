import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";


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

    @Column({nullable: false, type: 'date'})
    callFinishedDate: string;

    @ManyToOne(() => Call, (call) => call.id)
    call: Call;
  
}
