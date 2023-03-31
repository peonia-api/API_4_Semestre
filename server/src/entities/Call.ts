import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";

@Entity({name:"call"})
export class Call {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 8})
    callType: string;

    @Column({nullable: false, length: 80})
    callTitle: string;

    @Column({nullable: false})
    callDescription: string;

    @Column({nullable: false, length: 10})
    callPriority: string;

    @Column({nullable: false, length: 20})
    callState: string;

    @Column({nullable: false, length: 40})
    callRequester: string;

    @Column({nullable: false, length: 50})
    callTeam: string;

    @CreateDateColumn({ name: 'callDateCreate'})
    callDateCreate: Date;

    @Column({nullable: false, length: 70 })
    callEmail: string;

    @Column({nullable: false, length: 15 })
    callPhone: string;


}
