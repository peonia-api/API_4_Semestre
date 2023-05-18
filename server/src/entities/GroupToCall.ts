import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Group } from "./Groups"
import { Call } from "./Call"

@Entity({ name: "groupToCall" })
export class GroupToCall {
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // groupId: number

    // @Column()
    // callId: number

    @ManyToOne(() => Group, (group) => group.groupToCall, {onDelete: 'CASCADE', eager:true})
    group: Group

    @ManyToOne(() => Call, (call) => call.groupToCall, {onDelete: 'CASCADE', eager:true})
    call: Call
}