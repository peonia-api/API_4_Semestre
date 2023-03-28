/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import Swal from 'sweetalert2'
import '../App.css';

const initialValues = {
  nome: '',
  equipe: '',
  email: '',
  telefone: '',
  titulo: '',
  produto: '',
  descricao: '',
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

function Solicitacao() {

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    initialErrors: {nome: ""},
    onSubmit: async () => {      
      
    },
  })

  function onClickLimpar() {

    formik.resetForm();

  }

  function onClickEnviar() {

    Swal.fire('Sucesso', 'Solicitação enviada com sucesso!', 'success');
    formik.resetForm();

  }

  useEffect(() => {
    
  }, [])

  return (
    <form 
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='form-solicitacao'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-4'>
        <h1 className='text-dark fw-bolder mb-3 font-padrao-titulo'>Solicitação</h1>
        <div className='text-gray-500 fs-6'>Preencha os campos para gerar um chamado</div>
      </div>

      {formik.status && (
        <div className='mb-5 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      <div className='row'>
        <div className='col-lg-6'>
          {/* begin::Form group Nome */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Nome</label>
            <input
              placeholder='Nome do solicitante'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('nome')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.nome && formik.errors.nome,
                },
                {
                  'is-valid': formik.touched.nome && !formik.errors.nome,
                }
              )}
            />
            {formik.touched.nome && formik.errors.nome && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.nome}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
        <div className='col-lg-6'>
          {/* begin::Form group Equipe */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Equipe</label>
            <input
              placeholder='Equipe do solicitante'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('equipe')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.equipe && formik.errors.equipe,
                },
                {
                  'is-valid': formik.touched.equipe && !formik.errors.equipe,
                }
              )}
            />
            {formik.touched.equipe && formik.errors.equipe && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.equipe}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}      
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6'>
          {/* begin::Form group E-mail */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>E-mail</label>
            <input
              placeholder='E-mail do solicitante'
              type='email'
              autoComplete='off'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.email && formik.errors.email},
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
        <div className='col-lg-6'>
          {/* begin::Form group Telefone */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Telefone</label>
            <input
              id='fone'
              placeholder='Telefone para contato'
              type='number'
              autoComplete='off'
              onKeyDown={(event) => {
                if (/\+|\.|-/.test(event.key))
                  event.preventDefault();
              }}
              {...formik.getFieldProps('telefone')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.telefone && formik.errors.telefone,
                },
                {
                  'is-valid': formik.touched.telefone && !formik.errors.telefone,
                }
              )}
            />
            {formik.touched.telefone && formik.errors.telefone && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.telefone}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}      
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6'>
          {/* begin::Form group Título */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Título</label>
            <input
              placeholder='Título da solicitação'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('titulo')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.titulo && formik.errors.titulo},
                {
                  'is-valid': formik.touched.titulo && !formik.errors.titulo,
                }
              )}
            />
            {formik.touched.titulo && formik.errors.titulo && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.titulo}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>
        <div className='col-lg-6'>
          {/* begin::Form group Produto */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Produto</label>
            <input
              placeholder='Produto solicitado'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('produto')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.produto && formik.errors.produto,
                },
                {
                  'is-valid': formik.touched.produto && !formik.errors.produto,
                }
              )}
            />
            {formik.touched.produto && formik.errors.produto && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.produto}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}      
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          {/* begin::Form group Descrição */}
          <div className='fv-row mb-3'>
            <label className='form-label fw-bolder text-dark fs-6'>Descrição</label>
            <textarea
              placeholder='Descrição da solicitação'
              rows={5}
              autoComplete='off'
              {...formik.getFieldProps('descricao')}
              className={clsx(
                'form-control bg-transparent',
                {'is-invalid': formik.touched.descricao && formik.errors.descricao},
                {
                  'is-valid': formik.touched.descricao && !formik.errors.descricao,
                }
              )}
            ></textarea>
            {formik.touched.descricao && formik.errors.descricao && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.descricao}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}
        </div>        
      </div>
      
      {/* begin::Form group */}
      <div className='d-flex align-items-center justify-content-between mt-4'>
        <button type='button' className='btn btn-secondary' onClick={onClickLimpar}>Limpar</button>
        <button type='button' className='btn btn-secondary' onClick={onClickEnviar} disabled={formik.isSubmitting || !formik.isValid}>Enviar</button>        
      </div>
      {/* end::Form group */}
    </form>
  )
}

export default Solicitacao
