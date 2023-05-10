import * as Yup from 'yup'

const solicitacaoValidationSchema = Yup.object().shape({
  // callEmail: Yup.string()
  //   .email('O e-mail deve ser em um formato válido')
  //   .required('O e-mail é obrigatório'),

  callTitle: Yup.string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(80, 'O título deve ter no máximo 80 caracteres')
    .required('O título é obrigatório'),

  callType: Yup.string()
    .required('O tipo do chamado é obrigatório'),

  callPriority: Yup.string()
    .required('A prioridade é obrigatória'),

  callDescription: Yup.string()
    .min(30, 'A descrição deve ter no mínimo 30 caracteres')   
    .required('A descrição é obrigatória'),  
})

// const registrationSchema = Yup.object().shape({
//     callRequesterId: Yup.string()
//       .required('O solicitante é obrigatório'),

//     callRequester: Yup.string()
//       .min(3, 'O nome deve ter no mínimo 3 caracteres')
//       .max(40, 'O nome deve ter no máximo 40 caracteres')
//       .required('O nome é obrigatório'),

//     callType: Yup.string()
//       .required('O tipo do chamado é obrigatório'),

//     callEmail: Yup.string()
//       .email('O e-mail deve ser em um formato válido')
//       .required('O e-mail é obrigatório'),

//     callTitle: Yup.string()
//       .min(3, 'O título deve ter no mínimo 3 caracteres')
//       .max(80, 'O título deve ter no máximo 80 caracteres')
//       .required('O título é obrigatório'),

//     callDescription: Yup.string()
//       .min(30, 'A descrição deve ter no mínimo 30 caracteres')   
//       .required('A descrição é obrigatória'),

//     callPriority: Yup.string()
//       .required('A prioridade é obrigatória')
//   })

  export { solicitacaoValidationSchema} 
