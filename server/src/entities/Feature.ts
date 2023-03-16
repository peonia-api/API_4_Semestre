import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";

import { Call } from "./Call";

@Entity({name:"feature"})
export class Feature {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 15})
    featureState: string;

    @Column({nullable: false, length: 6})
    featurePriority: string;

    @ManyToOne(() => Call, (call) => call.id)
    call: Call[];

  
}
