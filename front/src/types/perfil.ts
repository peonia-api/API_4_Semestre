export const initialValues = {
    userName: '',
    userEmail: '',
    userAvatar: null,
}

export const initialValuesAlterarSenha = {
    userPassword: '',
    userConfirmPassword: '',
}

export interface Users {
    id: number;
    userName: string;
    userEmail: string;
    userAvatar: any;
}
