import * as Yup from 'yup'

const perfilValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('O nome é obrigatório'),
  userEmail: Yup.string()
    .required('O e-mail é obrigatório')
    .email('O e-mail deve ser em um formato válido'),
})

const perfilValidationSchemaAlterarSenha = Yup.object().shape({
  userPassword: Yup.string()
    .required('A senha é obrigatória')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!?%\-\=\\\/\[\]\{\}\(\)])[0-9a-zA-Z$*&@#!?%\-\=\\\/\[\]\{\}\(\)]{8,20}$/, 'A senha deve ter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo'),
  userConfirmPassword: Yup.string()
    .required('A confirmação de senha é obrigatória')
    .oneOf([Yup.ref('userPassword')], "A senha e a confirmação de senha não conferem"),
})

export {perfilValidationSchema, perfilValidationSchemaAlterarSenha} 
