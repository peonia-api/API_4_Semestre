import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Group } from "./Group";
import { Call } from "./Call";

@Entity({name:"committee"})
export class Committee {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 1})
    comiImpactCto: number;

    @Column({nullable: false, length: 1})
    comiImpactHp: number;

    @Column({nullable: false, length: 1})
    comiCostSquad: number;

    @Column({nullable: false, length: 1})
    comiRiskRt: number;

    @Column({nullable: false, length: 1})
    comiRiskCso: number;

    @OneToMany(() => Group, (group) => group.committee)
    group: Group[];

    @OneToMany(() => Call, (call) => call.committee)
    call: Call[];

}
