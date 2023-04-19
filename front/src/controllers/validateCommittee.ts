import * as Yup from 'yup'

const registrationSchemaCommit = Yup.object().shape({
    comiImpactCto: Yup.string()
        .required('O nome é obrigatório'),

    comiImpactHp: Yup.string()
        .required('O tipo do chamado é obrigatório'),

    comiCostSquad: Yup.string()
        .required('O e-mail é obrigatório'),

    comiRiskRt: Yup.string()
        .required('O telefone é obrigatório'),

    comiRiskCso: Yup.string()
        .required('O título é obrigatório'),

})
export default registrationSchemaCommit;
