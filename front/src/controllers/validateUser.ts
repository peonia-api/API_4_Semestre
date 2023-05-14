import * as Yup from 'yup'

const registrationSchemaUser = Yup.object().shape({
    userName: Yup.string()
      .min(3, 'O nome deve ter no mínimo 3 caracteres')
      .max(40, 'O nome deve ter no máximo 40 caracteres')
      .required('O nome é obrigatório'),

    userType: Yup.string()
      .required('O tipo de usuário é obrigatório'),

    userPosition: Yup.string()
      .required('O cargo é obrigatório'),

    userPassword: Yup.string()
      .required('A senha é obrigatória')
      .min(8, "A senha deve ter no mínimo 8 caracteres"),

    userEmail: Yup.string()     
      .required('O e-mail é obrigatório')
      .min(8, "O e-mail deve ter no mínimo 8 caracteres"),
  })
  export default registrationSchemaUser;
