export const initialValues = {
    callRequester: '',
    callType: '',
    callEmail: '',
    callPhone: '',
    callTitle: '',
    callDescription: '',
    callTeam:'',
    callPriority: '',
    callState: 'Inicializado',
}

export interface Calls {
    id: number;
    callType: string;
    callEmail: string;
    callTitle: string;
    callPhone: number;
    callDescription: string;
    callState: string;
    callRequester: string;
    callPriority: number;
    callDateCreate: Date;
}

