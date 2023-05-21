import { Users } from "./user";

export const initialValues = {
    groupType: '',
    groupDescription: '',
    clientes: '',
    groupName: "",
    groupEmail: "",
}

export interface Groups {
    id: number;
    groupType: string;
    groupName: string;
    groupDescription: string;
    clientes: string;
    user: Users;
}
