import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";


import { Call } from "./Call";

@Entity({name:"arquivo"})
export class Arquivo {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 4})
    arquivoType: string;

    @Column({nullable: false, length: 15})
    featureState: string;

    @ManyToOne(() => Call, (call) => call.id)
    call: Call;

  
}
