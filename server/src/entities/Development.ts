import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { Archive } from "./Archive";


import { Call } from "./Call";

@Entity({name:"development"})
export class Development {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    devPriority: number;

    @Column({nullable: false, length: 30})
    devResponsible: string;

    @Column({nullable: false, length: 15})
    devState: string;

    @Column({nullable: false, length: 10})
    devType: string;

    @ManyToOne(() => Call, (call) => call.id)
    call: Call;

    @OneToMany(() => Archive, (archive) => archive.id)
    archive: Archive[];
  
}
