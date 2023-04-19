import { useFormik } from "formik";
import { Committee, initialValues } from "../types/committee";
import { URIcommit } from "../enumerations/uri";
import axios from "axios";
import clsx from "clsx";
import { registrationSchemaCommit } from "../controllers/validateCommittee";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import avaliar from "../images/avaliar.png";
import { avisoConcluido } from "../controllers/avisoConcluido";
import { avisoErro } from "../controllers/avisoErro";

function ComiteCso(id:any) {

    const [data, setData] = useState<Committee[]>([]);

    useEffect(() => {
        async function fetchCommittee() {
            axios
                .get(URIcommit.PEGAR_TODOS_COMITE)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log(id);
        }
        fetchCommittee();
    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchemaCommit,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            await axios.put(URIcommit.ALTERA_COMITE_CSO, formik.values.comiRiskCso);
        },
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onClickEnviar() {
        if (!formik.isValid) {
            avisoErro();
        } else {
            formik.submitForm();
            avisoConcluido();
        }
    }

    return (
        <>

            <a onClick={handleShow}>
                <img style={{ width: '25px' }} src={avaliar} alt='Avaliar' />
            </a>

            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                        noValidate
                        id="form-solicitacao"
                        onSubmit={formik.handleSubmit}
                        style={{ margin: "8px" }}
                    >
                        <div className="fv-row mb">
                            <label className="form-label text-dark fs-6">
                                Análise de Risco - CSO
                            </label>
                            <select
                                placeholder="Análise de Risco - CSO"
                                autoComplete="off"
                                {...formik.getFieldProps("comiRiskCso")}
                                onChange={formik.handleChange}
                                value={formik.values.comiRiskCso}
                                className={clsx(
                                    "form-control bg-transparent",
                                    {
                                        "is-invalid":
                                            formik.touched.comiRiskCso && formik.errors.comiRiskCso,
                                    },
                                    {
                                        "is-valid":
                                            formik.touched.comiRiskCso && !formik.errors.comiRiskCso,
                                    }
                                )}
                            >
                                <option value="" disabled label="Análise de Risco - CSO">
                                    Análise de Risco - CSO{" "}
                                </option>
                                <option
                                    value="0"
                                    onChange={formik.handleChange}
                                    label="0"
                                >
                                    0
                                </option>
                                <option
                                    value="1"
                                    onChange={formik.handleChange}
                                    label="1"
                                >
                                    1
                                </option>
                                <option
                                    value="2"
                                    onChange={formik.handleChange}
                                    label="2"
                                >
                                    2
                                </option>
                                <option
                                    value="3"
                                    onChange={formik.handleChange}
                                    label="3"
                                >
                                    3
                                </option>
                            </select>
                            {formik.touched.comiRiskCso && formik.errors.comiRiskCso && (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                        <span role="alert">{formik.errors.comiRiskCso}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button
                        type="button"
                        className="btn btn-form"
                        onClick={onClickEnviar}
                        disabled={formik.isSubmitting}
                    >
                        Submeter
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-send-check-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                        </svg>
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default ComiteCso;