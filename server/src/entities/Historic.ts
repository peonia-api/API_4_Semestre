import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { Development } from "./Development";
import { Call } from "./Call";

@Entity({name:"historic"})
export class Historic {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 15})
    histState: string;

    @CreateDateColumn({ name: 'callFinishedDate'})
    callFinishedDate: Date;

    @ManyToOne(() => Call, (call) => call.id)
    call: Call;

}
