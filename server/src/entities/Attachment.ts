import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { Call } from "./Call";

@Entity({name:"attachment"})
export class Attachment {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    src: string;

    @ManyToOne(() => Call, (call) => call.attachment)
    call: Call;


}