import * as Yup from 'yup'

const initialValues = {
    callRequester: '',
    callType: '',
    callEmail: '',
    callPhone: '',
    callTitle: '',
    callDescription: '',
    callPriority: '',
    callState: 'Inicializado',
    callTeam:'',
  }  

const registrationSchema = Yup.object().shape({
    callRequester: Yup.string()
      .min(3, 'O nome deve ter no mínimo 3 caracteres')
      .max(40, 'O nome deve ter no máximo 40 caracteres')
      .required('O nome é obrigatório'),

    callType: Yup.string()
      .required('O tipo do chamado é obrigatório'),

    callEmail: Yup.string()
      .email('O e-mail deve ser em um formato válido')
      .required('O e-mail é obrigatório'),

    callPhone: Yup.string()
      .min(10, 'O telefone deve ter no mínimo 10 números incluindo DDD')
      .max(15, 'O telefone deve ter no máximo 15 números incluindo DDD')
      .required('O telefone é obrigatório'),

    callTitle: Yup.string()
      .min(3, 'O título deve ter no mínimo 3 caracteres')
      .max(80, 'O título deve ter no máximo 80 caracteres')
      .required('O título é obrigatório'),

    callDescription: Yup.string()
      .min(30, 'A descrição deve ter no mínimo 30 caracteres')   
      .required('A descrição é obrigatória'),

    callPriority: Yup.string()
      .required('A prioridade é obrigatória')
  })
  export default registrationSchema;
