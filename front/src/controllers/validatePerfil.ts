import * as Yup from 'yup'

const perfilValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('O nome é obrigatório'),
  userEmail: Yup.string()
    .required('O e-mail é obrigatório')
    .email('O e-mail deve ter um formato válido'),
})

const perfilValidationSchemaAlterarSenha = Yup.object().shape({
  userPassword: Yup.string()
    .required('A senha é obrigatória')
    .matches(/^[0-9a-z\-\=\\\/\[\]\{\}\(\)]{8,}$/, 'A senha deve ter pelo menos 8 dígitos'),
  userConfirmPassword: Yup.string()
    .required('A confirmação de senha é obrigatória')
    .oneOf([Yup.ref('userPassword')], "A senha e a confirmação de senha não conferem"),
})

export {perfilValidationSchema, perfilValidationSchemaAlterarSenha} 
