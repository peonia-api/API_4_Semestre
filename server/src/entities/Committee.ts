import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Group } from "./Group";
import { Call } from "./Call";

@Entity({name:"committee"})
export class Committee {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comiImpactCto: number;

    @Column()
    comiImpactHp: number;

    @Column()
    comiCostSquad: number;

    @Column()
    comiRiskRt: number;

    @Column()
    comiRiskCso: number;

    @OneToMany(() => Group, (group) => group.committee)
    group: Group[];

    @OneToMany(() => Call, (call) => call.committee)
    call: Call[];

    @ManyToOne(() => Call, (call) => call.committee, {eager:true})
    committee: Committee;

}
