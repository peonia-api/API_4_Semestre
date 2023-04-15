/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useFormik } from "formik";
import clsx from "clsx";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro, registrationSchema } from "../controllers";
import { URI } from "../enumerations/uri";
import React from "react";
import { initialValues } from "../types";


function CadastroUsuario() {
    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchema,
        initialErrors: { callRequester: "" },
        onSubmit: async (values) => {
            JSON.stringify(values, null, 2);
            await axios.post(URI.ENVIAR_CALL, formik.values);
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

    useEffect(() => { }, []);

    return (
        <form
            className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            id="form-solicitacao"
            onSubmit={formik.handleSubmit}
            style={{ margin: "8px" }}
        >
            <div className="text-center mb-4">
                <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">
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
                            {...formik.getFieldProps("callRequester")}
                            onChange={formik.handleChange}
                            value={formik.values.callRequester}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.callRequester && formik.errors.callRequester,
                                },
                                {
                                    "is-valid":
                                        formik.touched.callRequester &&
                                        !formik.errors.callRequester,
                                }
                            )}
                        />
                        {formik.touched.callRequester && formik.errors.callRequester && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.callRequester}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Nome */}
                </div>
                <div className="col-lg-6">
                    {/* begin::Form group Telefone */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">
                            Telefone
                        </label>
                        <input
                            id="fone"
                            placeholder="Telefone para contato"
                            type="number"
                            autoComplete="off"
                            onKeyDown={(event) => {
                                if (/\+|\.|-/.test(event.key)) event.preventDefault();
                            }}
                            {...formik.getFieldProps("callPhone")}
                            onChange={formik.handleChange}
                            value={formik.values.callPhone}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.callPhone && formik.errors.callPhone,
                                },
                                {
                                    "is-valid":
                                        formik.touched.callPhone && !formik.errors.callPhone,
                                }
                            )}
                        />
                        {formik.touched.callPhone && formik.errors.callPhone && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.callPhone}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Telefone */}
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
                            {...formik.getFieldProps("callEmail")}
                            onChange={formik.handleChange}
                            value={formik.values.callEmail}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.callEmail && formik.errors.callEmail,
                                },
                                {
                                    "is-valid":
                                        formik.touched.callEmail && !formik.errors.callEmail,
                                }
                            )}
                        />
                        {formik.touched.callEmail && formik.errors.callEmail && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.callEmail}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group E-mail */}
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
                            {...formik.getFieldProps("callTitle")}
                            onChange={formik.handleChange}
                            value={formik.values.callTitle}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.callTitle && formik.errors.callTitle,
                                },
                                {
                                    "is-valid":
                                        formik.touched.callTitle && !formik.errors.callTitle,
                                }
                            )}
                        />
                        {formik.touched.callTitle && formik.errors.callTitle && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.callTitle}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Título */}
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4">
                    {/* begin::Form group Cargo */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">
                            Cargo
                        </label>
                        <select
                            placeholder="Tipo do Chamado (Hotfix ou Feature)"
                            autoComplete="off"
                            {...formik.getFieldProps("callType")}
                            onChange={formik.handleChange}
                            value={formik.values.callType}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.callType && formik.errors.callType,
                                },
                                {
                                    "is-valid":
                                        formik.touched.callType && !formik.errors.callType,
                                }
                            )}
                        >
                            <option value="" disabled label="Selecione o cargo">
                                Cargo{" "}
                            </option>
                            <option
                                value="hotfix"
                                onChange={formik.handleChange}
                                label="Cibersegurança"
                            >
                                Cibersegurança
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="RT"
                            >
                                RT
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="CTO"
                            >
                                CTO
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="Head"
                            >
                                Head
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="Squad"
                            >
                                Squad
                            </option>
                        </select>
                        {formik.touched.callType && formik.errors.callType && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.callType}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Cargo*/}
                </div>
                <div className="col-lg-4">
                    {/* begin::Form group Equipe */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">
                            Equipe
                        </label>
                        <select
                            placeholder="Selecione a equipe"
                            autoComplete="off"
                            {...formik.getFieldProps("callPriority")}
                            onChange={formik.handleChange}
                            value={formik.values.callPriority}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.callPriority && formik.errors.callPriority,
                                },
                                {
                                    "is-valid":
                                        formik.touched.callPriority && !formik.errors.callPriority,
                                }
                            )}
                        >
                            <option
                                value=""
                                disabled
                                label="Selecione a equipe"
                            >
                                Prioridade do chamado{" "}
                            </option>
                            <option
                                value="hotfix"
                                onChange={formik.handleChange}
                                label="Cibersegurança"
                            >
                                Cibersegurança
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="RT"
                            >
                                RT
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="CTO"
                            >
                                CTO
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="Head"
                            >
                                Head
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="Squad"
                            >
                                Squad
                            </option>
                        </select>
                        {formik.touched.callPriority && formik.errors.callPriority && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.callPriority}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Equipe*/}
                </div>
                <div className="col-lg-4">
                    {/* begin::Form group Tipo usuario */}
                    <div className="fv-row mb-3">
                        <label className="form-label fw-bolder text-dark fs-6">
                            Tipo de usuário
                        </label>
                        <select
                            placeholder="Tipo do Chamado (Hotfix ou Feature)"
                            autoComplete="off"
                            {...formik.getFieldProps("callType")}
                            onChange={formik.handleChange}
                            value={formik.values.callType}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                        formik.touched.callType && formik.errors.callType,
                                },
                                {
                                    "is-valid":
                                        formik.touched.callType && !formik.errors.callType,
                                }
                            )}
                        >
                            <option value="" disabled label="Selecione o tipo de usuário">
                                Tipo de usuário{" "}
                            </option>
                            <option
                                value="hotfix"
                                onChange={formik.handleChange}
                                label="Administrador"
                            >
                                Administrador
                            </option>
                            <option
                                value="feature"
                                onChange={formik.handleChange}
                                label="Feature"
                            >
                                Feature
                            </option>
                        </select>
                        {formik.touched.callType && formik.errors.callType && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">{formik.errors.callType}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Tipo Usuario*/}
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
    );
}

export default CadastroUsuario;
