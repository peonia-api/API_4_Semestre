import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Group } from "./Group";
import { Call } from "./Call";

@Entity({name:"committee"})
export class Committee {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    comiImpactCto: number;

    @Column({nullable: false})
    comiImpactHp: number;

    @Column({nullable: false})
    comiCostSquad: number;

    @Column({nullable: false})
    comiRiskRt: number;

    @Column({nullable: false})
    comiRiskCso: number;

    @OneToMany(() => Group, (group) => group.committee)
    group: Group[];

    @OneToMany(() => Call, (call) => call.committee)
    call: Call[];

}
