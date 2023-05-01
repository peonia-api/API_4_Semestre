import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Call } from "./Call";

@Entity({ name: "committee" })
export class Committee {
    // define a chave primária como auto incremento
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    comiImpactCto: number;

    @Column({ nullable: false })
    comiImpactCtoAvaliation: string;

    @Column({ nullable: true })
    comiImpactHp: number;

    @Column({ nullable: false })
    comiImpactoHpAvaliation: string;

    // @Column({ nullable: true })
    // comiCostSquad: number;

    @Column({ nullable: true })
    comiRiskRt: number;

    @Column({ nullable: false })
    comiRiskRtAvaliation: string;

    @Column({ nullable: true })
    comiRiskCso: number;

    @Column({ nullable: false })
    comiRiskCsoAvaliation: string;

    // @OneToMany(() => Group, (group) => group.committee)
    // group: Group[];

    @ManyToOne(() => Call, (call) => call.committee, { eager: true })
    call: Call;
}
