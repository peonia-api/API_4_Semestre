import * as Yup from 'yup'

const perfilValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('O nome é obrigatório'),
  userEmail: Yup.string()
    .email('O e-mail deve ser em um formato válido')
    .required('O e-mail é obrigatório'),
  userPassword: Yup.string().when((val, schema) => {
    if(val?.length > 0) {
       return schema.min(8, 'A senha deve ter no mínimo 8 caracteres')
                    .max(20, 'A senha deve ter no máximo 20 caracteres')
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!?%\-\=\\\/\[\]\{\}\(\)])[0-9a-zA-Z$*&@#!?%\-\=\\\/\[\]\{\}\(\)]{8,20}$/, 'A senha deve ter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo');
    }
    else { 
       return schema.notRequired();
    }
  }),
})

  export {perfilValidationSchema} 
