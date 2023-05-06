import { Groups } from "./group";
import { Users } from "./user";

export interface GroupsToUser {
    filter(arg0: (groupToUser: any) => boolean): unknown;
    id: number;
    group: Groups
    user: Users
}