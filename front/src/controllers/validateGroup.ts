import * as Yup from 'yup'

const registrationSchemaUser = Yup.object().shape({
    groupName: Yup.string()
    .required('O nome do grupo é obrigatório'),

    groupType: Yup.string()
      .required('O tipo do grupo é obrigatório'),
   
    groupDescription: Yup.string()
      .required('A descrição do grupo é obrigatória'),

  })
  export default registrationSchemaUser;
