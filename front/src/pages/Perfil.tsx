/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";
import axios from "axios";
import { avisoErro, perfilValidationSchema } from "../controllers";
import { URIperfil } from "../enumerations/uri";
import { initialValues, initialValuesAlterarSenha } from "../types/perfil";
import Header from "../components/Header";
import avatar from "../images/avatar.png";
import { avisoErroRequisicao } from "../controllers/avisoErro";
import { avisoAlterarSenha, avisoPerfil } from "../controllers/avisoConcluido";
import "../App.css";
import { Modal } from "react-bootstrap";
import { perfilValidationSchemaAlterarSenha } from "../controllers/validatePerfil";

function Perfil() {
  const [showMdlAlterarSenha, setShowMdlAlterarSenha] = useState(false)
  const [avatarSRC, setAvatarSRC] = useState(avatar)
  const inputFile = useRef<HTMLInputElement>(null)
  

  const handleCloseMdlAlterarSenha = () => setShowMdlAlterarSenha(false)

  const handleOpenMdlAlterarSenha = () => {
    setShowMdlAlterarSenha(true)
  };

  const onChangeInputFile = (e: any) =>{
    const files = e.target.files;
    if (FileReader && files && files.length > 0) {
      const file = files[0] 
      var fr = new FileReader();
      fr.onload = function () {
        if(fr.result){
          setAvatarSRC(fr.result.toString())
          formik.setFieldValue('userAvatar', file)
        }        
      }           
      fr.readAsDataURL(file);
    }
  }

  const onClickRmvAvatar = () =>{   
    setAvatarSRC(avatar)
    formik.setFieldValue('userAvatar', null)
    if(inputFile.current){
      inputFile.current.value = ''
    }
  }
  console.log(localStorage.getItem("userName"));
  
  const formik = useFormik({
    initialValues: {
      userName: localStorage.getItem("userName")?? "",
      userEmail: localStorage.getItem("userEmail")?.replace(/["]/g, "") ?? ""
    },
    validationSchema: perfilValidationSchema,
    onSubmit: async (values) => {
      JSON.stringify(values, null, 2);
      
      await axios.post(URIperfil.ALTERA_PERFIL, values).then(async (res) => {

        if(res.status === 200){
          avisoPerfil()
        }

      }).catch((err) => {

        avisoErroRequisicao()
          
      })

    },
  });

  const formikAlterarSenha = useFormik({
    initialValues: initialValuesAlterarSenha,
    validationSchema: perfilValidationSchemaAlterarSenha,
    onSubmit: async (values) => {
      JSON.stringify(values, null, 2);
      
      await axios.post(URIperfil.ALTERA_SENHA, values).then(async (res) => {

        if(res.status === 200){
          avisoAlterarSenha()
        }

      }).catch((err) => {

        avisoErroRequisicao()
          
      })

    },
  });

  function OnClickAtualizar() {
    if (!formik.isValid) {
      avisoErro();
    } else {
      formik.submitForm();
    }
  }

  function OnClickAlterarSenha() {
    if (!formikAlterarSenha.isValid) {
      avisoErro();
    } else {
      formikAlterarSenha.submitForm();
    }
  }


  return (
    <>
      <Header /> 

      <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>

        <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
        <form
            className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            id="form-perfil"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-center mb-4">
              <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">
                Meu Perfil
              </h1>
              <div
                className="text-gray-500 fs-6 font-padrao-titulo mb-5"
                style={{ letterSpacing: 0 }}
              >
                Veja e atualize seus dados
              </div>
            </div>

            {formik.status && (
              <div className="mb-5 alert alert-danger">
                <div className="alert-text font-weight-bold">{formik.status}</div>
              </div>
            )}

            <div className="row">
              <div className="col-lg-5">
                <div
                  className='d-flex align-items-center justify-content-center'
                >
                  <div className="d-flex border border-2 shadow-sm rounded-circle">
                    <input ref={inputFile} accept="image/png, image/jpeg" type="file" className="d-none" onChange={onChangeInputFile} />
                    <img className="rounded-circle" src={avatarSRC} alt="avatar" style={{
                      width: 280,
                      height: 280
                    }} />
                    <span style={{
                      position: "relative",
                      top: 0,
                      right: 35,
                      width: 0,
                      height: 0
                    }}>
                      <button type="button" className="btn btn-icon btn-sm" onClick={() => { inputFile.current?.click() }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill m-0" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                      </button>
                    </span>
                    <span className={avatarSRC === avatar ? 'd-none' : ''} style={{
                      position: "relative",
                      top: 249,
                      right: 35,
                      width: 0,
                      height: 0
                    }}>
                      <button type="button" className="btn btn-icon btn-sm" onClick={onClickRmvAvatar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill m-0" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                      </button>
                    </span>
                  </div>            
                </div>
              </div>
              <div className="col-lg-7">
                <div className="row">

                  <div className="col-lg-12">
                    {/* begin::Form group Nome */}
                    <div className="fv-row mb-3">
                      <label className="form-label fw-bolder text-dark fs-6">
                        Nome
                      </label>
                      <input
                        placeholder="Nome do usuário"
                        type="text"
                        autoComplete="off"
                        {...formik.getFieldProps("userName")}
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.userName && formik.errors.userName,
                          },
                          {
                            "is-valid":
                              formik.touched.userName && !formik.errors.userName,
                          }
                        )}
                      />
                      {formik.touched.userName && formik.errors.userName && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.userName}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group Nome */}
                  </div>

                  <div className="col-lg-12">
                    {/* begin::Form group E-mail */}
                    <div className="fv-row mb-3">
                      <label className="form-label fw-bolder text-dark fs-6">E-mail</label>
                      <input
                        placeholder="E-mail do usuário"
                        autoComplete="off"
                        {...formik.getFieldProps("userEmail")}
                        onChange={formik.handleChange}
                        value={formik.values.userEmail ?? ''}
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.userEmail && formik.errors.userEmail,
                          },
                          {
                            "is-valid":
                              formik.touched.userEmail && !formik.errors.userEmail,
                          }
                        )}
                      >
                      </input>        
                      {formik.touched.userEmail && formik.errors.userEmail && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.userEmail}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Form group E-mail */}
                  </div> 

                </div>
              </div>
            </div>

            {/* begin::Form group */}
            <div className="d-flex align-items-center justify-content-end mt-4">    
              <button
                  type="button"
                  className="btn btn-form me-5"
                  onClick={handleOpenMdlAlterarSenha}
                  disabled={formik.isSubmitting}
                >
                  Alterar senha
              </button>
              <button
                type="button"
                className="btn btn-form"
                onClick={OnClickAtualizar}
                disabled={formik.isSubmitting}
              >
                Atualizar informações
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </button>
            </div>
            {/* end::Form group */}
          </form>
        </div>
      </div>

      <Modal show={showMdlAlterarSenha} onHide={handleCloseMdlAlterarSenha} centered>
          <Modal.Header closeButton>
            <Modal.Title>Alterar senha</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form 
              className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
              noValidate
              id="form-perfil-alterar-senha"
              onSubmit={formikAlterarSenha.handleSubmit}
            >
              <div className="row">

                <div className="col-lg-12">
                  {/* begin::Form group Senha */}
                  <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-dark fs-6">Senha</label>
                    <input
                      type="password"
                      placeholder="Digite a senha"
                      autoComplete="off"
                      {...formikAlterarSenha.getFieldProps("userPassword")}
                      onChange={formikAlterarSenha.handleChange}
                      value={formikAlterarSenha.values.userPassword ?? ''}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                          formikAlterarSenha.touched.userPassword && formikAlterarSenha.errors.userPassword,
                        },
                        {
                          "is-valid":
                          formikAlterarSenha.touched.userPassword && !formikAlterarSenha.errors.userPassword,
                        }
                      )}
                    >
                    </input>        
                    {formikAlterarSenha.touched.userPassword && formikAlterarSenha.errors.userPassword && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formikAlterarSenha.errors.userPassword}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group Senha */}
                </div> 

                <div className="col-lg-12">
                  {/* begin::Form group Confirmar Senha */}
                  <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-dark fs-6">Confirmar Senha</label>
                    <input
                      type="password"
                      placeholder="Confirme a senha"
                      autoComplete="off"
                      {...formikAlterarSenha.getFieldProps("userConfirmPassword")}
                      onChange={formikAlterarSenha.handleChange}
                      value={formikAlterarSenha.values.userConfirmPassword ?? ''}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                          formikAlterarSenha.touched.userConfirmPassword && formikAlterarSenha.errors.userConfirmPassword,
                        },
                        {
                          "is-valid":
                          formikAlterarSenha.touched.userConfirmPassword && !formikAlterarSenha.errors.userConfirmPassword,
                        }
                      )}
                    >
                    </input>        
                    {formikAlterarSenha.touched.userConfirmPassword && formikAlterarSenha.errors.userConfirmPassword && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formikAlterarSenha.errors.userConfirmPassword}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group Confirmar Senha */}

                </div> 

              </div>
            </form>            
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex align-items-center justify-content-end mt-4">        
                <button
                  type="button"
                  className="btn btn-form"
                  onClick={OnClickAlterarSenha}
                  disabled={formikAlterarSenha.isSubmitting}
                >
                  Alterar
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>
              </div>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default Perfil;

