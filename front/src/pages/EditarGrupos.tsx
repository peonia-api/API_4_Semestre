import Header from "../components/Header";
import '../App.css';
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Users } from "../types/user";
import axios from "axios";
import { URIgroup, URIgroupToUser, URIuser } from "../enumerations/uri";
import registrationSchemaUserEditar from "../controllers/validateUserEditar";
import { avisoErro } from "../controllers/avisoErro";
import { avisoEdicao } from "../controllers";
import clsx from "clsx";
import Select from 'react-select';
import salvar from "../images/salvar.png";
import { GroupsToUser } from "../types/groupToUser";
import { Groups } from "../types/group";

function EditarGrupos() {

    const id = window.location.href.split("/")[4];

    const [data, setData] = useState<GroupsToUser>();

    useEffect(() => {
        async function fetchGroupToUser(id: string) {
            console.log("Fetching data for ID:", id);
            axios
                .get(`${URIgroupToUser.PEGAR_GROUP_TO_USER_ESPECIFICO}${id}`)
                .then((response) => {
                    const fetchedData = response.data;
                    console.log("Fetched data:", fetchedData);
                    setData(fetchedData);
                    formik.setValues(fetchedData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }        
        fetchGroupToUser(id);
        console.log(id);
        
    }, []);

    console.log("ID:", id);

    const formik = useFormik({
        initialValues: {
            groupType: data?.group?.groupType ?? "",
            user: data?.user ?? "",
        },
        validationSchema: registrationSchemaUserEditar,
        initialErrors: { groupType: "" },
        onSubmit: async (values) => {
            try {
                const updatedData = {
                    groupType: values.groupType,
                    user: values.user,
                };

                await axios.put(`${URIgroupToUser.ALTERA_GROUP_TO_USER}${id}`, updatedData);
            } catch (error) {
                console.log(error);
                formik.setStatus("Ocorreu um erro ao atualizar a equipe.");
            }
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
            avisoEdicao().then((res: any) => {
                window.location.assign("/listagemGrupos");
            })
        }
    }

    const options = [{value: "opcao1", label: "Opção 1"}, {value: "opcao2", label: "Opção 2"}, {value: "opcao3", label: "Opção 3"}]

    const values = ["opcao1", "opcao2"]

    return(
        <>
        <Header /> 
        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
            <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
                <div className="text-center mb-4">
                    <h1 className="text-dark fw-semi-bold mb-3 font-padrao-titulo">
                        Editar Equipe
                    </h1>
                </div>

                {formik.status && (
                    <div className="mb-5 alert alert-danger">
                        <div className="alert-text font-weight-bold">{formik.status}</div>
                    </div>
                )}

                <div className="row">
                    <div className="col-lg-12">
                        {/* begin::Form group Nome do time */}
                        <div className="fv-row mb-3 col-lg-6">
                            <label className="form-label fw-bolder text-dark fs-6">Nome da equipe</label>
                            <input
                                placeholder="Nome da equipe"
                                type="text"
                                autoComplete="off"
                                {...formik.getFieldProps("groupType")}
                                onChange={formik.handleChange}
                                value={formik.values.groupType}
                                className={clsx(
                                    "form-control bg-transparent",
                                    {
                                        "is-invalid":
                                            formik.touched.groupType && formik.errors.groupType,
                                    },
                                    {
                                        "is-valid":
                                            formik.touched.groupType &&
                                            !formik.errors.groupType,
                                    }
                                )}
                            />
                            {formik.touched.groupType && formik.errors.groupType && (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                        <span role="alert">{formik.errors.groupType}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* end::Form group Nome do time */}
                    </div>
                    <div className="col-lg-12">
                        {/* begin::Form group Membros */}
                        <div className="fv-row mb-3">
                            <label className="form-label fw-bolder text-dark fs-6">
                                Membros
                            </label>
                            <Select
                                defaultValue={options.filter(({value}) => values.includes(value))}
                                isMulti
                                name="users"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                        {/* end::Form group Membros*/}
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                        <label className="form-label fw-bolder text-dark fs-6">
                        Descrição
                        </label>
                    </div>
                    {/* begin::Form group Descrição */}
                        <div className="fv-row mb-3 col-md-12">
                            <textarea
                                className="form-control"
                                placeholder="Descrição da equipe"
                                rows={5}
                                autoComplete="off"
                                // {...formik.getFieldProps("callDescription")}
                                // onChange={formik.handleChange}
                                // value={formik.values.callDescription}
                                // className={clsx(
                                //     "form-control bg-transparent",
                                //     {
                                //     "is-invalid":
                                //         formik.touched.callDescription &&
                                //         formik.errors.callDescription,
                                //     },
                                //     {
                                //     "is-valid":
                                //         formik.touched.callDescription &&
                                //         !formik.errors.callDescription,
                                //     }
                                // )}
                            />
                            {/* {formik.touched.callDescription &&
                                formik.errors.callDescription && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                            <span role="alert">{formik.errors.callDescription}</span>
                                        </div>
                                    </div>
                            )} */}
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
                        Salvar
                        <img src={salvar} alt="icone salvar" style={{height:"20px", width:"20px", marginLeft:"5px"}}/>
                    </button>
                </div>
            </div>
        {/* end::Form group */}
        </div>  
    </>
    );
}

export default EditarGrupos;