import axios from "axios";

export enum URI {
    ENVIAR_CALL = "https://neural-house-388217.uw.r.appspot.com/call/createCall",
    ALTERA_CALL = "https://neural-house-388217.uw.r.appspot.com/call/modifyCall/",
    ATUALIZA_HOTFIX = "https://neural-house-388217.uw.r.appspot.com/call/updateHotfix/",
    DELETE_CALL = "https://neural-house-388217.uw.r.appspot.com/call/delete/",
    PEGAR_CALL = "https://neural-house-388217.uw.r.appspot.com/call/historic",
    PEGAR_CAll_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/call/especificoCall/",
    PEGAR_CALL_HOTFIX = "https://neural-house-388217.uw.r.appspot.com/call/hotfix",
    PEGAR_CALL_FEATURE = "https://neural-house-388217.uw.r.appspot.com/call/feature",
    PEGAR_CAll_User = "https://neural-house-388217.uw.r.appspot.com/call/callUser/",
    PEGAR_CAll_ARQUIVADO = "https://neural-house-388217.uw.r.appspot.com/call/arquivados/",
    ALTERA_EMAIL = "https://neural-house-388217.uw.r.appspot.com/call/email/",
}

export enum URIgroup {
    ENVIAR_GROUP = "https://neural-house-388217.uw.r.appspot.com/group/create",
    ALTERA_GROUP = "https://neural-house-388217.uw.r.appspot.com/group/modify/",
    DELETE_GROUP = "https://neural-house-388217.uw.r.appspot.com/group/delete/",
    PEGAR_GROUP = "https://neural-house-388217.uw.r.appspot.com/group/historic",
    PEGAR_GROUP_USER = "https://neural-house-388217.uw.r.appspot.com/group/email/",
    PEGAR_GROUP_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/group/specific/",
    PEGAR_GROUP_Cliente = "https://neural-house-388217.uw.r.appspot.com/group/cliente/", //cliente
    ALTERA_EMAIL = "https://neural-house-388217.uw.r.appspot.com/group/email/",
    PEGAR_GRUPO_FUNCIONARIO = "https://neural-house-388217.uw.r.appspot.com/group/funcionario/"
}

export enum URIgroupToUser {
    ENVIAR_GROUP_TO_USER = "https://neural-house-388217.uw.r.appspot.com/groupToUser/create",
    ALTERA_GROUP_TO_USER = "https://neural-house-388217.uw.r.appspot.com/groupToUser/modify/",
    DELETE_GROUP_TO_USER = "https://neural-house-388217.uw.r.appspot.com/groupToUser/delete/",
    PEGAR_GROUP_TO_USER = "https://neural-house-388217.uw.r.appspot.com/groupToUser/historic",
    PEGAR_GROUP_TO_USER_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/groupToUser/specific/",
    PEGAR_GROUP_TO_USER_EMAIL = "https://neural-house-388217.uw.r.appspot.com/groupToUser/groupUser/",
}

export enum URIgroupToCall {
    ENVIAR_GROUP_TO_CALL = "https://neural-house-388217.uw.r.appspot.com/groupToCall/create",
    ALTERA_GROUP_TO_CALL = "https://neural-house-388217.uw.r.appspot.com/groupToCall/modify/",
    DELETE_GROUP_TO_CALL = "https://neural-house-388217.uw.r.appspot.com/groupToCall/delete/",
    PEGAR_GROUP_TO_CALL = "https://neural-house-388217.uw.r.appspot.com/groupToCall/historic",
    PEGAR_GROUP_TO_CALL_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/groupToCall/specific/",
    PEGAR_GROUP_TO_CALL_CLIENT = "https://neural-house-388217.uw.r.appspot.com/groupToCall/grouptocall/",
}

export enum URIuser {
    ENVIAR_USER = "https://neural-house-388217.uw.r.appspot.com/user/createUser",
    ALTERA_USER = "https://neural-house-388217.uw.r.appspot.com/user/modifyUser/",
    DELETE_USER = "https://neural-house-388217.uw.r.appspot.com/user/delete/",
    PEGAR_USER = "https://neural-house-388217.uw.r.appspot.com/user/historicUser",
    PEGAR_USER_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/user/especificoUser/",
    LOGIN_USER = "https://neural-house-388217.uw.r.appspot.com/user/login/",
    ALTERA_SENHA = "https://neural-house-388217.uw.r.appspot.com/user/redefinirSenha/",
    PEGAR_ID_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/user/especificoId/",
    PEGAR_ALL_USERS = "https://neural-house-388217.uw.r.appspot.com/user/getAllUser/",
    PEGA_EMAIL_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/user/especificoEmail/",
    VERIFICA_TYPE = "https://neural-house-388217.uw.r.appspot.com/user/veficaType/",
    ALTERA_PERFIL = "https://neural-house-388217.uw.r.appspot.com/user/perfil/",
}

export enum URItask {
    ENVIAR_TAKS = "https://neural-house-388217.uw.r.appspot.com/task/create",
    ALTERA_TAKS = "https://neural-house-388217.uw.r.appspot.com/task/modify/",
    DELETE_TAKS = "https://neural-house-388217.uw.r.appspot.com/task/delete/",
    PEGAR_TAKS = "https://neural-house-388217.uw.r.appspot.com/task/historic/",
    PATCH_TAKS = "https://neural-house-388217.uw.r.appspot.com/task/patch/",
}



export enum URIcommit {
    ENVIAR_COMITE = "https://neural-house-388217.uw.r.appspot.com/committee/createCommittee",
    PEGAR_COMITE = "https://neural-house-388217.uw.r.appspot.com/committee/filter/",
    PEGAR_COMITE_ALL = "https://neural-house-388217.uw.r.appspot.com/committee/filterAll/",
    PEGAR_COMITE_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee/filterAllStatus/",
    PEGAR_comiRiskRt_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee/comiRiskRtStatus/",
    PEGAR_ARCHIVED_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee/archived/",


    PEGAR_comiRiskCso_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee//comiRiskCsoStatus/",
    PEGAR_comiImpactCto_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee/comiImpactCtoStatus/",
    PEGAR_comiImpactHp_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee/comiImpactHpStatus/",
    PEGAR_comiCostSquad_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee/comiCostSquadStatus/",

    PEGAR_TODOS_COMITE = "https://neural-house-388217.uw.r.appspot.com/committee/committeeAll/",
    PEGAR_COMITE_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/committee/especifico/",
    ALTERA_COMITE_CTO = "https://neural-house-388217.uw.r.appspot.com/committee/impactCto/",
    ALTERA_COMITE_HP = "https://neural-house-388217.uw.r.appspot.com/committee/impactHp/",
    ALTERA_COMITE_SQUAD = "https://neural-house-388217.uw.r.appspot.com/committee/costSquad/",
    ALTERA_COMITE_RT = "https://neural-house-388217.uw.r.appspot.com/committee/riskRt/",
    ALTERA_COMITE_CSO = "https://neural-house-388217.uw.r.appspot.com/committee/riskCso/",
    ALTERA_ARCHIVED_STATUS = "https://neural-house-388217.uw.r.appspot.com/committee/alteraStatus/",
    DELETE_COMITE = "https://neural-house-388217.uw.r.appspot.com/committee/deletar/"
}

export enum URIattach {
    ENVIAR_ANEXO = "https://neural-house-388217.uw.r.appspot.com/file/file/",
    ENVIAR_ANEXO_SUPABASE = "https://neural-house-388217.uw.r.appspot.com/file/fun/",
    PEGAR_TODOS_ANEXO = "https://neural-house-388217.uw.r.appspot.com/file/fileAll/",
    PEGAR_ANEXO_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/file/fileCall/",
    ALTERA_ANEXO_ESPECIFICO = "https://neural-house-388217.uw.r.appspot.com/file/fileReneme/",
    DELETE_ANEXO = "https://neural-house-388217.uw.r.appspot.com/file/fileRemove/",
    DELETE_ANEXO_SUPABASE = "https://neural-house-388217.uw.r.appspot.com/file/fileRemoveSupa/",
    DELETE_ANEXO_ONE_SUPABASE = "https://neural-house-388217.uw.r.appspot.com/file/fileRemoveOneSupa/",
    ALTERA_ANEXO_ESPECIFICO_SUPABASE = "https://neural-house-388217.uw.r.appspot.com/file/fileNameSupa/",
}


export const api = axios.create({
    baseURL: 'https://neural-house-388217.uw.r.appspot.com',
    withCredentials: true
})
