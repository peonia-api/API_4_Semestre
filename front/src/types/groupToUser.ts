import { Groups } from "./group";
import { Users } from "./user";

export interface GroupsToUser {
    id: number;
    group: Groups
    user: Users
}

export const initialValues = {
    groupType: '',
    groupDescription: '',
    userName: '',
}