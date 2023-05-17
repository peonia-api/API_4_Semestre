import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Call } from "./Call";
import { GroupToCall } from "./GroupToCall";
import { GroupToUser } from "./GroupToUser";
import { Kanban } from "./Kanban";

@Entity({ name: "group" })

export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 80 })
    groupType: string;

    @Column({ nullable: false, length: 80 })
    groupName: string;

    @Column({ nullable: false, length: 100 })
    groupDescription: string;

    // @ManyToMany(() => User)
    // @JoinTable()
    // user: User[]

    // @ManyToMany(() => Call)
    // @JoinTable()
    // call: Call[]

    @Column({ nullable: true })
    cliente: string;

    @OneToMany(() => GroupToCall, (groupToCall) => groupToCall.group)
    groupToCall: GroupToCall[];

    @OneToMany(() => GroupToUser, (groupToUser) => groupToUser.group)
    groupToUser: GroupToUser[];

    @OneToMany(() => Kanban, (kanban) => kanban.group)
    kanban: Kanban[];
}