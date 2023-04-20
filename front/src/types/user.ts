export const initialValues = {
    userName: '',
    userEmail: '',
    userPassword: '',
    userType: '',
    userPosition: ''
}

export interface Users {
    id: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    userType: string;
    userPosition: string;
}
