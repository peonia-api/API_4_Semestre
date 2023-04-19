import * as Yup from 'yup'

export const registrationSchemaCommit = Yup.object().shape({
    comiImpactCto: Yup.number()
        .required('O nome é obrigatório'),

    comiImpactHp: Yup.number()
        .required('O tipo do chamado é obrigatório'),

    comiCostSquad: Yup.number()
        .required('O e-mail é obrigatório'),

    comiRiskRt: Yup.number()
        .required('O telefone é obrigatório'),

    comiRiskCso: Yup.number()
        .required('O título é obrigatório'),

})
