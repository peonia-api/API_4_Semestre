import * as Yup from 'yup'

const  initialValues = {
    nome: '',
    tipo: '',
    email: '',
    telefone: '',
    titulo: '',
    descricao: '',
    prioridade: '',
    equipe: '',
    produto: ''
    // callRequester: '',
    // callEmail: '',
    // callPhone: '',
    // callTitle: '',
    // callType: '',
    // callDescription: '',
    // callPriority: '',
    // callState: ''
  }  

const registrationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'O nome deve ter no mínimo 3 caracteres')
      .max(50, 'O nome deve ter no máximo 50 caracteres')
      .required('O nome é obrigatório'),
    equipe: Yup.string()
      .min(3, 'A equipe deve ter no mínimo 3 caracteres')
      .max(50, 'A equipe deve ter no máximo 50 caracteres')
      .required('A equipe é obrigatória'),
    email: Yup.string()
      .email('O e-mail deve ser em um formato válido')
      .required('O e-mail é obrigatório'),
    telefone: Yup.string()
      .min(10, 'O telefone deve ter no mínimo 10 números incluindo DDD')
      .max(11, 'O telefone deve ter no máximo 11 números incluindo DDD')
      .required('O telefone é obrigatório'),
    titulo: Yup.string()
      .min(3, 'O título deve ter no mínimo 3 caracteres')
      .max(50, 'O título deve ter no máximo 50 caracteres')
      .required('O título é obrigatório'),
    produto: Yup.string()
      .min(3, 'O produto deve ter no mínimo 3 caracteres')
      .max(50, 'O produto deve ter no máximo 50 caracteres')
      .required('O produto é obrigatório'),
    descricao: Yup.string()
      .min(3, 'A descrição deve ter no mínimo 3 caracteres')
      .max(500, 'A descrição deve ter no máximo 500 caracteres')
      .required('A descrição é obrigatória'),
  })
  export default registrationSchema;
