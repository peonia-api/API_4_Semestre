import { Users } from "./user";

export const initialValues = {
    groupType: '',
    groupDescription: '',
}

export interface Groups {
    id: number;
    groupType: string;
    groupDescription: string;
    user: Users
}
