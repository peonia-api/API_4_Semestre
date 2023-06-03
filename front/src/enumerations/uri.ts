import axios from "axios";

export enum URI {
    ENVIAR_CALL = "http://localhost:3001/call/createCall",
    ALTERA_CALL = "http://localhost:3001/call/modifyCall/",
    ATUALIZA_HOTFIX = "http://localhost:3001/call/updateHotfix/",
    DELETE_CALL = "http://localhost:3001/call/delete/",
    PEGAR_CALL = "http://localhost:3001/call/historic",
    PEGAR_CAll_ESPECIFICO = "http://localhost:3001/call/especificoCall/",
    PEGAR_CALL_HOTFIX = "http://localhost:3001/call/hotfix",
    PEGAR_CALL_FEATURE = "http://localhost:3001/call/feature",
    PEGAR_CAll_User = "http://localhost:3001/call/callUser/",
    PEGAR_CAll_ARQUIVADO = "http://localhost:3001/call/arquivados/",
    ALTERA_EMAIL = "http://localhost:3001/call/email/",
}

export enum URIgroup {
    ENVIAR_GROUP = "http://localhost:3001/group/create",
    ALTERA_GROUP = "http://localhost:3001/group/modify/",
    DELETE_GROUP = "http://localhost:3001/group/delete/",
    PEGAR_GROUP = "http://localhost:3001/group/historic",
    PEGAR_GROUP_USER = "http://localhost:3001/group/email/",
    PEGAR_GROUP_ESPECIFICO = "http://localhost:3001/group/specific/",
    PEGAR_GROUP_Cliente = "http://localhost:3001/group/cliente/", //cliente
    ALTERA_EMAIL = "http://localhost:3001/group/email/",
    PEGAR_GRUPO_FUNCIONARIO = "http://localhost:3001/group/funcionario/"
}

export enum URIgroupToUser {
    ENVIAR_GROUP_TO_USER = "http://localhost:3001/groupToUser/create",
    ALTERA_GROUP_TO_USER = "http://localhost:3001/groupToUser/modify/",
    DELETE_GROUP_TO_USER = "http://localhost:3001/groupToUser/delete/",
    PEGAR_GROUP_TO_USER = "http://localhost:3001/groupToUser/historic",
    PEGAR_GROUP_TO_USER_ESPECIFICO = "http://localhost:3001/groupToUser/specific/",
    PEGAR_GROUP_TO_USER_EMAIL = "http://localhost:3001/groupToUser/groupUser/",
}

export enum URIgroupToCall {
    ENVIAR_GROUP_TO_CALL = "http://localhost:3001/groupToCall/create",
    ALTERA_GROUP_TO_CALL = "http://localhost:3001/groupToCall/modify/",
    DELETE_GROUP_TO_CALL = "http://localhost:3001/groupToCall/delete/",
    PEGAR_GROUP_TO_CALL = "http://localhost:3001/groupToCall/historic",
    PEGAR_GROUP_TO_CALL_ESPECIFICO = "http://localhost:3001/groupToCall/specific/",
    PEGAR_GROUP_TO_CALL_CLIENT = "http://localhost:3001/groupToCall/grouptocall/",
}

export enum URIuser {
    ENVIAR_USER = "http://localhost:3001/user/createUser",
    ALTERA_USER = "http://localhost:3001/user/modifyUser/",
    DELETE_USER = "http://localhost:3001/user/delete/",
    PEGAR_USER = "http://localhost:3001/user/historicUser",
    PEGAR_USER_ESPECIFICO = "http://localhost:3001/user/especificoUser/",
    LOGIN_USER = "http://localhost:3001/user/login/",
    ALTERA_SENHA = "http://localhost:3001/user/redefinirSenha/",
    PEGAR_ID_ESPECIFICO = "http://localhost:3001/user/especificoId/",
    PEGAR_ALL_USERS = "http://localhost:3001/user/getAllUser/",
    PEGA_EMAIL_ESPECIFICO = "http://localhost:3001/user/especificoEmail/",
    VERIFICA_TYPE = "http://localhost:3001/user/veficaType/",
    ALTERA_PERFIL = "http://localhost:3001/user/perfil/",
}

export enum URItask {
    ENVIAR_TAKS = "http://localhost:3001/task/create",
    ALTERA_TAKS = "http://localhost:3001/task/modify/",
    DELETE_TAKS = "http://localhost:3001/task/delete/",
    PEGAR_TAKS = "http://localhost:3001/task/historic/",
    PATCH_TAKS = "http://localhost:3001/task/patch/",
}



export enum URIcommit {
    ENVIAR_COMITE = "http://localhost:3001/committee/createCommittee",
    PEGAR_COMITE = "http://localhost:3001/committee/filter/",
    PEGAR_COMITE_ALL = "http://localhost:3001/committee/filterAll/",
    PEGAR_COMITE_STATUS = "http://localhost:3001/committee/filterAllStatus/",
    PEGAR_comiRiskRt_STATUS = "http://localhost:3001/committee/comiRiskRtStatus/",
    PEGAR_ARCHIVED_STATUS = "http://localhost:3001/committee/archived/",


    PEGAR_comiRiskCso_STATUS = "http://localhost:3001/committee//comiRiskCsoStatus/",
    PEGAR_comiImpactCto_STATUS = "http://localhost:3001/committee/comiImpactCtoStatus/",
    PEGAR_comiImpactHp_STATUS = "http://localhost:3001/committee/comiImpactHpStatus/",
    PEGAR_comiCostSquad_STATUS = "http://localhost:3001/committee/comiCostSquadStatus/",

    PEGAR_TODOS_COMITE = "http://localhost:3001/committee/committeeAll/",
    PEGAR_COMITE_ESPECIFICO = "http://localhost:3001/committee/especifico/",
    ALTERA_COMITE_CTO = "http://localhost:3001/committee/impactCto/",
    ALTERA_COMITE_HP = "http://localhost:3001/committee/impactHp/",
    ALTERA_COMITE_SQUAD = "http://localhost:3001/committee/costSquad/",
    ALTERA_COMITE_RT = "http://localhost:3001/committee/riskRt/",
    ALTERA_COMITE_CSO = "http://localhost:3001/committee/riskCso/",
    ALTERA_ARCHIVED_STATUS = "http://localhost:3001/committee/alteraStatus/",
    DELETE_COMITE = "http://localhost:3001/committee/deletar/"
}

export enum URIattach {
    ENVIAR_ANEXO = "http://localhost:3001/file/file/",
    ENVIAR_ANEXO_SUPABASE = "http://localhost:3001/file/fun/",
    PEGAR_TODOS_ANEXO = "http://localhost:3001/file/fileAll/",
    PEGAR_ANEXO_ESPECIFICO = "http://localhost:3001/file/fileCall/",
    ALTERA_ANEXO_ESPECIFICO = "http://localhost:3001/file/fileReneme/",
    DELETE_ANEXO = "http://localhost:3001/file/fileRemove/",
    DELETE_ANEXO_SUPABASE = "http://localhost:3001/file/fileRemoveSupa/",
    DELETE_ANEXO_ONE_SUPABASE = "http://localhost:3001/file/fileRemoveOneSupa/",
    ALTERA_ANEXO_ESPECIFICO_SUPABASE = "http://localhost:3001/file/fileNameSupa/",
}


export const api = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true
})
