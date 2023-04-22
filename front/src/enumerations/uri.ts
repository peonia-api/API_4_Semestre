import axios from "axios";

export enum URI {
    ENVIAR_CALL = "http://localhost:3001/call/createCall",
    ALTERA_CALL = "http://localhost:3001/call/modifyCall/",
    DELETE_CALL = "http://localhost:3001/call/delete/",
    PEGAR_CALL = "http://localhost:3001/call/historic",
    PEGAR_CAll_ESPECIFICO = "http://localhost:3001/call/especificoCall/",
    PEGAR_CALL_HOTFIX = "http://localhost:3001/call/hotfix",
    PEGAR_CALL_FEATURE = "http://localhost:3001/call/feature"
}

export enum URIuser {
    ENVIAR_USER = "http://localhost:3001/user/createUser",
    ALTERA_USER = "http://localhost:3001/user/modifyUser/",
    DELETE_USER = "http://localhost:3001/user/delete/",
    PEGAR_USER = "http://localhost:3001/user/historicUser",
    PEGAR_USER_ESPECIFICO = "http://localhost:3001/user/especificoUser/",
    LOGIN_USER = "http://localhost:3001/user/login/",
    //ALTERA_SENHA = "http://localhost:3001/user/redefinirSenha/",
    //PEGAR_USER_ESPECIFICO_EMAIL = "http://localhost:3001/user/especificoEmail/",
}

export enum URIcommit{
    ENVIAR_COMITE = "http://localhost:3001/committee/createCommittee",
    PEGAR_COMITE = "http://localhost:3001/committee/filter/",
    PEGAR_COMITE_ALL = "http://localhost:3001/committee/filterAll/",
    PEGAR_COMITE_STATUS = "http://localhost:3001/committee//filterAllStatus/",
    PEGAR_TODOS_COMITE = "http://localhost:3001/committee/committeeAll/",
    PEGAR_COMITE_ESPECIFICO = "http://localhost:3001/committee/especifico/",
    ALTERA_COMITE_CTO = "http://localhost:3001/committee/impactCto/",
    ALTERA_COMITE_HP = "http://localhost:3001/committee/impactHp/",
    ALTERA_COMITE_SQUAD = "http://localhost:3001/committee/costSquad/",
    ALTERA_COMITE_RT = "http://localhost:3001/committee/riskRt/",
    ALTERA_COMITE_CSO = "http://localhost:3001/committee/riskCso/",
    DELETE_COMITE = "http://localhost:3001/committee/deletar/"
}

export enum URIattach{
    ENVIAR_ANEXO = "http://localhost:3001/file/file",
    PEGAR_ANEXO = "http://localhost:3001/file/fun/",
    PEGAR_TODOS_ANEXO = "http://localhost:3001/file/fileAll/",
    PEGAR_ANEXO_ESPECIFICO = "http://localhost:3001/file/fileCall/",
    ALTERA_ANEXO_ESPECIFICO = "http://localhost:3001/file/fileReneme/",
    DELETE_ANEXO = "http://localhost:3001/file/fileRemove/"
}


export const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  })
