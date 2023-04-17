import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { Committee } from "./Committee";
import { User } from "./User";
import { Attachment } from "./Attachment";

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

    @CreateDateColumn({ name: 'callDateCreate'})
    callDateCreate: Date;

    @ManyToOne(() => Committee, (committee) => committee.call , {eager:true})
    committee: Committee;

    @ManyToOne(() => User, (user) => user.call, {eager:true})
    user: User;

    @OneToMany(() => Attachment, (attachment) => attachment.call)
    attachment: Attachment[];




}
