export const initialValues = {
    userName: '',
    userEmail: '',
    userPassword: '',
    userAvatar: null,
}

export interface Users {
    id: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    userAvatar: any;
}
