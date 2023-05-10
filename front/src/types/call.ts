export const solicitacaoInitialValues = { 
    callEmail: '',
    callTitle: '',
    callType: '',
    callPriority: '',
    callDescription: '',
    callFiles: [],
}

export const initialValues = {    
    callType: '',
    callEmail: '',
    callTitle: '',
    callDescription: '',
    callPriority: '',
    callState: 'Inicializado',
    callFiles: []
}

export interface Calls {
    id: number;
    callType: string;
    callEmail: string;
    callTitle: string;
    callDescription: string;
    callPriority: number;
    callDateCreate: Date;
    callDateFinalization: Date;
    callRequesterId: number
    callFiles: []
    callStatus: string;
}

export interface LogCall{
    id: number;
    type: string;
    nota: number;
    descricao: string;
}

export interface Status {
    id: number;
    mensage: string;
    callStatus: string;
}