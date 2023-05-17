import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupToCall } from "./GroupToCall";
import { Group } from "./Groups";
import { Call } from "./Call";

@Entity({ name: "kanban" })

export class Kanban {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 80 })
    kanToDo: string;

    @Column({ nullable: false, length: 80 })
    kanInProgress: string;

    @Column({ nullable: false, length: 80 })
    kanDone: string;

    @Column({ nullable: false, length: 80 })
    kanEmail: string;

    @ManyToOne(() => Call, (call) => call.committee, { eager: true })
    call: Call; 
    
    @ManyToOne(() => Group, (group) => group.groupToCall, {eager:true})
    group: Group; 

    
}