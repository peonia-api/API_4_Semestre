import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";

import { Call } from "./Call";

@Entity({name:"hotfix"})
export class Hotfix {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 15})
    hotfixState: string;

    @Column({nullable: false, length: 6})
    hotfixPriority: string;

    @ManyToOne(() => Call, (call) => call.id)
    call: Call;

  
}
