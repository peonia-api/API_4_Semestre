import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { Committee } from "./Committee";
import { Attachment } from "./Attachment";
import { GroupToCall } from "./GroupToCall";
import { Task } from "./Task";

@Entity({ name: "call" })
export class Call {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    callEmail: string;

    @Column({ nullable: false, length: 8 })
    callType: string;

    @Column({ nullable: false, length: 80 })
    callTitle: string;

    @Column({ nullable: false })
    callDescription: string;

    @Column({ nullable: true, length: 10 })
    callPriority: string;

    @Column({ nullable: true })
    callStatus: string;

    @CreateDateColumn({ name: 'callDateCreate' })
    callDateCreate: Date;

    @CreateDateColumn({ name: 'callDateFinalization' })
    callDateFinalization: Date;

    @Column({nullable: true})
    HpDescription: string

    @Column({ nullable: true })
    avaliar: string;

    @OneToMany(() => Attachment, (attachment) => attachment.call)
    attachment: Attachment[];

    @OneToMany(() => Committee, (committee) => committee.call)
    committee: Committee[];

    @OneToMany(() => Task, (task) => task.call)
    task: Task[];


    @OneToMany(() => GroupToCall, (groupToCall) => groupToCall.call)
    groupToCall: GroupToCall[];
}
