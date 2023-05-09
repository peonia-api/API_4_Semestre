import * as Yup from 'yup'

const registrationSchemaUser = Yup.object().shape({
    groupType: Yup.string()
      .required('O nome é obrigatório'),

    groupDescription: Yup.string()
      .required('O tipo de usuário é obrigatório'),

  })
  export default registrationSchemaUser;
