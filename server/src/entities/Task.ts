import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupToCall } from "./GroupToCall";
import { Group } from "./Groups";
import { Call } from "./Call";

@Entity({ name: "task" })

export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 30 })
    taskStatus: string;

    @Column({ nullable: true, length: 100 })
    taskDescription: string;

    @Column({ nullable: true, length: 80 })
    taskUserResponsible: string;


    @ManyToOne(() => Call, (call) => call.committee, { eager: true })
    call: Call; 
    
    @ManyToOne(() => Group, (group) => group.groupToCall, {eager:true})
    group: Group; 

    
}