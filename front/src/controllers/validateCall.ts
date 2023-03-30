import * as Yup from 'yup'

const  initialValues = {
    callRequester: '',
    callType: '',
    callEmail: '',
    callPhone: '',
    callTitle: '',
    callDescription: '',
    callPriority: 'Padrão',
    callState: 'Inicializado',
    callTeam:'',
  }  

const registrationSchema = Yup.object().shape({
    callRequester: Yup.string()
      .min(3, 'O nome deve ter no mínimo 3 caracteres')
      .max(40, 'O nome deve ter no máximo 40 caracteres')
      .required('O nome é obrigatório'),
    callType: Yup.string()
      .min(3, 'O tipo do chamado deve ter no mínimo 3 caracteres')
      .max(8, 'O tipo do chamado deve ter no máximo 8 caracteres')
      .required('A equipe é obrigatória'),
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
    callTeam: Yup.string()
      .min(3, 'O nome da equipe deve ter no mínimo 3 caracteres')
      .max(50, 'O nome da equipe deve ter no máximo 50 caracteres')
      .required('O produto é obrigatório'),
    callDescription: Yup.string()
      .min(3, 'A descrição deve ter no mínimo 3 caracteres')
      .max(250, 'A descrição deve ter no máximo 250 caracteres')
      .required('A descrição é obrigatória'),
  })
  export default registrationSchema;
