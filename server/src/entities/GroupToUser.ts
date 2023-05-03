import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Group } from "./Groups"
import { User } from "./User"

@Entity({ name: "groupToUser" })
export class GroupToUser {
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // public userId: number

    @ManyToOne(() => Group, (group) => group.groupToUser, {eager:true})
    group: Group

    @ManyToOne(() => User, (user) => user.groupToUser, {eager:true})
    user: User
}