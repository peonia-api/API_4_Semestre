/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro } from "../controllers";
import registrationSchemaUser from "../controllers/validateUser";
import { URIuser } from "../enumerations/uri";
import { initialValues } from "../types/user";
import Header from "../components/Header";
import '../App.css';

function CadastroUsuario() {
    const [type, setType] = useState({} as any);
    let options = null;
    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchemaUser,
        initialErrors: { userName: "" },
        onSubmit: async (values) => {
            JSON.stringify(values, null, 2);
            await axios.post(URIuser.ENVIAR_USER, formik.values);
            onClickLimpar();
        },
    });

    function onClickLimpar() {
        formik.resetForm();
    }

    function onClickEnviar() {
        if (!formik.isValid) {
            avisoErro();
        } else {
            formik.submitForm();
            avisoConcluido();
        }
    }



    useEffect(() => {
        function typeUser(){
            axios.get(URIuser.VERIFICA_TYPE).then((res) => {
                setType(res.data)
            })
        }
        typeUser()
        
     }, []);
     if(type){
        for (let i = 0; i < type.length; i++) {
            console.log(type[i].type);
            options = <option key={type[i]}>{type[i].type}</option>
            console.log(options);
            
            
        }
        // type.map((res:any) => {
        //     console.log(res);
            
        // })
        //options = type.map((el:any) => <option key={el}>{el}</option>);
     }
     

    return (
        <>
        <Header /> 
        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
            <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
            <form
            className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            id="form-solicitacao"
            onSubmit={formik.handleSubmit}
            style={{ margin: "8px" }}
        >
            <div className="text-center mb-4">
                <h1 className="text-dark mb-3 font-padrao-titulo">
                    Cadastrar Usuário
                </h1>
                <div
                    className="text-gray-500 fs-6 font-padrao-titulo mb-5"
                    style={{ letterSpacing: 0 }}
                >
                    Preencha os campos e defina a permissão para cadastrar um novo usuário
                </div>
            </div>

            {formik.status && (
                <div className="mb-5 alert alert-danger">
                    <div className="alert-text font-weight-bold">{formik.status}</div>
                </div>
            )}

            <div className="row">
                <div className="col-lg-6">
                    {/* begin::Form group Nome */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">Nome</label>
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
                                        formik.touched.userName &&
                                        !formik.errors.userName,
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

                <div className="col-lg-6">
                    {/* begin::Form group Senha */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">
                            Senha
                        </label>
                        <input
                            placeholder="Senha"
                            type="password"
                            autoComplete="off"
                            {...formik.getFieldProps("userPassword")}
                            onChange={formik.handleChange}
                            value={formik.values.userPassword}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.userPassword && formik.errors.userPassword,
                                },
                                {
                                    "is-valid":
                                        formik.touched.userPassword && !formik.errors.userPassword,
                                }
                            )}
                        />
                        {formik.touched.userPassword && formik.errors.userPassword && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.userPassword}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Título */}
                </div>

            </div>

            <div className="row">
                <div className="col-lg-6">
                    {/* begin::Form group E-mail */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">
                            E-mail
                        </label>
                        <input
                            placeholder="E-mail do usuário"
                            type="email"
                            autoComplete="off"
                            {...formik.getFieldProps("userEmail")}
                            onChange={formik.handleChange}
                            value={formik.values.userEmail}
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
                        />
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
                <div className="col-lg-6">
                    {/* begin::Form group Cargo */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">Cargo</label>
                        <input
                            placeholder="Cargo"
                            type="text"
                            autoComplete="off"
                            {...formik.getFieldProps("userPosition")}
                            onChange={formik.handleChange}
                            value={formik.values.userPosition}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.userPosition && formik.errors.userPosition,
                                },
                                {
                                    "is-valid":
                                        formik.touched.userPosition &&
                                        !formik.errors.userPosition,
                                }
                            )}
                        />
                        {formik.touched.userPosition && formik.errors.userPosition && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.userPosition}</span>
                                </div>
                            </div>
                        )}
                    </div>
            </div>

            <div className="row">
                    <div className="col-lg-6">
                        {/* begin::Form group Tipo usuario */}
                        <div className="fv-row mb-3">
                            <label className="form-label fw-bolder text-dark fs-6">
                                Tipo de usuário
                            </label>
                            <select
                                placeholder="Tipo do Chamado (Hotfix ou Feature)"
                                autoComplete="off"
                                {...formik.getFieldProps("userType")}
                                onChange={formik.handleChange}
                                value={formik.values.userType}
                                className={clsx(
                                    "form-control bg-transparent",
                                    {
                                        "is-invalid":
                                            formik.touched.userType && formik.errors.userType,
                                    },
                                    {
                                        "is-valid":
                                            formik.touched.userType && !formik.errors.userType,
                                    }
                                )}
                            >
                                <option value="" disabled label="Selecione o tipo de usuário">
                                    Tipo de usuário{" "}
                                </option>
                                <option value="CSO" onChange={formik.handleChange} label="CSO (Chief Security Officer)"> CSO (Chief Security Officer) </option>
                                <option value="RT" onChange={formik.handleChange} label="RT (Responsável Técnico)" > RT (Responsável Técnico) </option>
                                <option value="CTO" onChange={formik.handleChange} label="CTO (Chief Technology Officer)"> CTO (Chief Technology Officer) </option>
                                <option value="HP" onChange={formik.handleChange} label="Head de plataforma"> Head de plataforma </option>
                                {/* <option value="SQUAD" onChange={formik.handleChange} label="Squad"> Squad </option> */}
                                <option value="Padrao" onChange={formik.handleChange} label="Padrão"> Padrão </option>
                            </select>
                            {formik.touched.userType && formik.errors.userType && (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                        <span role="alert">{formik.errors.userType}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* end::Form group Tipo Usuario*/}
                    </div>
                </div>
            </div>

            {/* begin::Form group */}
            <div className="d-flex align-items-center justify-content-between mt-4">
                <button type="button" className="btn btn-form" onClick={onClickLimpar}>
                    Limpar
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-backspace-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="btn btn-form"
                    onClick={onClickEnviar}
                    disabled={formik.isSubmitting}
                >
                    Enviar
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send-check-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                        {/* https://icons.getbootstrap.com/icons/person-plus/ */}
                    </svg>
                </button>
            </div>
            {/* end::Form group */}
        </form>
            </div>
        </div>
        </>
    );
}

export default CadastroUsuario;