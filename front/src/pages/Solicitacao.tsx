/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro, avisoEspera, solicitacaoValidationSchema } from "../controllers";
import { URI, URIattach, URIcommit, URIgroup, URIgroupToCall, URIgroupToUser, URIuser } from "../enumerations/uri";
import { solicitacaoInitialValues } from "../types/call";
//import Dropzone from "../components/Dropzone";
import Header from "../components/Header";
import '../App.css';
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { supabase, uploadFile } from "../services/supabase";
import { Attachment } from "../types/attachment";
import { Groups } from "../types/group";
import Select from "react-select";
function Solicitacao() {

  useEffect(() => {
    async function fetchUsers() {
      axios
        .get(URIgroup.PEGAR_GROUP)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUsers();
  }, []);

  const [files, setFiles] = useState([] as any);
  const [selectedGroup, setSelectedGroup] = useState([] as any);
  const [data, setData] = useState<Groups[]>([]);


  const updateFiles = (incommingFiles:any) => {
    //do something with the files
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const removeFile = (id:any) => {
    setFiles(files.filter((x:any) => x.id !== id));
  };
console.log(files);

const handleSelectChange = (selectedOptions: any) => {
  const selectedValues = selectedOptions.map((option: any) => option.value);
  setSelectedGroup(selectedValues);
};

const options = data.map((data) => ({
  value: data.id,
  label: data.groupName
}));

  //uploadFile(files)
  
  const formik = useFormik({
    initialValues: solicitacaoInitialValues,
    validationSchema: solicitacaoValidationSchema,
    initialErrors: { callTitle: '' },
    onSubmit: async (values) => {
      JSON.stringify(values, null, 2);
      await axios.post(URI.ENVIAR_CALL, formik.values).then(async (res) => {
        for (let i = 0; i < selectedGroup.length; i++) {
          await axios.post(URIgroupToCall.ENVIAR_GROUP_TO_CALL, { group: selectedGroup[i], call: res.data.id })
        }
        if(formik.values.callType == "feature"){
          await axios.post(URIcommit.ENVIAR_COMITE, {id: res.data.id})
        }
        if(files){
          uploadFile(files).then(async (rest) => {
            console.log(rest);
            await axios.post(`${URIattach.ENVIAR_ANEXO_SUPABASE}${res.data.id}`, rest ).then((s) => {
            
            }).catch((err) =>{
              console.log(err);
              
            })
            
          })
          
        }


      }).catch((err) => {
          console.log("oi");
          
      })
      avisoEspera().then((res) => {
        setTimeout(function(){avisoConcluido().then((res:any) => {
          setTimeout(function(){window.location.assign("/listagem");}, 2000)
          
        })}, 3000)
      })
    },
  });

  function onClickLimpar() {
    formik.resetForm();
  }

  function onClickEnviar() {
    formik.values.callEmail = localStorage.getItem("userEmail")?.replace(/["]/g, "") ?? ""
    formik.values.callPriority = "avaliar"
    if (!formik.isValid) {
      avisoErro();
    } else {
      formik.submitForm();
      
      
      
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
      id="form-solicitacao"
      onSubmit={formik.handleSubmit}
      style={{ margin: "8px" }}
    >
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">
          Solicitação
        </h1>
        <div
          className="text-gray-500 fs-6 font-padrao-titulo mb-5"
          style={{ letterSpacing: 0 }}
        >
          Preencha os campos para gerar um chamado
        </div>
      </div>

      {formik.status && (
        <div className="mb-5 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      <div className="row">
        {/* <div className="col-lg-6">*/}
          {/* begin::Form group E-mail */}
          {/* <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">E-mail</label>
            <input
              placeholder="E-mail"
              autoComplete="off"
              {...formik.getFieldProps("callEmail")}
              onChange={formik.handleChange}
              value={formik.values.callEmail ?? ''}
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
            >
            </input>        
            {formik.touched.callEmail && formik.errors.callEmail && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.callEmail}</span>
                </div>
              </div>
            )}
          </div> */}
          
          {/* end::Form group Nome */}
       {/* </div>         */}
        {/* <div className="col-lg-6"> */}
          {/* begin::Form group Título */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">
              Título
            </label>
            <input
              placeholder="Título da solicitação"
              type="text"
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
          {/* </div> */}
          {/* end::Form group Título */}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          {/* begin::Form group Tipo Chamado */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">
              Chamado
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
              <option value="" disabled label="Selecione o tipo do chamado">
                Tipo do chamado{" "}
              </option>
              <option
                value="hotfix"
                onChange={formik.handleChange}
                label="Hotfix"
              >
                Hotfix
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
          {/* end::Form group Tipo Chamado*/}
        </div>
        <div className="col-lg-6">
          <label className="form-label fw-bolder text-dark fs-6">
                Grupos
              </label>
                <Select
                  defaultValue={options.filter(({ value }) => selectedGroup.includes(value))}
                  isMulti
                  name="users"
                  options={options}
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                />
              
          {/* begin::Form group Prioridade */}
          {/* <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">
              Prioridade
            </label>
            <select
              placeholder="Prioridade do chamado"
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
                label="Selecione a prioridade do chamado"
              >
                Prioridade do chamado{" "}
              </option>
              <option value="alta" onChange={formik.handleChange} label="Alta">
                Alta
              </option>
              <option
                value="media"
                onChange={formik.handleChange}
                label="Média"
              >
                Media
              </option>
              <option
                value="baixa"
                onChange={formik.handleChange}
                label="Baixa"
              >
                Baixa
              </option>
            </select>
            {formik.touched.callPriority && formik.errors.callPriority && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.callPriority}</span>
                </div>
              </div>
            )}
          </div>*/}
          {/* end::Form group Tipo Prioridade*/}


        </div> 
      </div>

      <div className="row">
        <div className="col-lg-12">
          {/* begin::Form group Descrição */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">
              Descrição
            </label>
            <textarea
              placeholder="Descrição da solicitação"
              rows={5}
              autoComplete="off"
              {...formik.getFieldProps("callDescription")}
              onChange={formik.handleChange}
              value={formik.values.callDescription}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.callDescription &&
                    formik.errors.callDescription,
                },
                {
                  "is-valid":
                    formik.touched.callDescription &&
                    !formik.errors.callDescription,
                }
              )}
            ></textarea>
            {formik.touched.callDescription &&
              formik.errors.callDescription && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.callDescription}</span>
                  </div>
                </div>
              )}
          </div>
          {/* end::Form group */}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          {/* begin::Form group Documentos */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-dark fs-6">
              Documentos
            </label>
            {/* <Dropzonee callFiles={formik.values.callFiles} setFieldValue={formik.setFieldValue} /> */}
              <Dropzone
                  style={{ minWidth: "505px" }}
                  onChange={updateFiles}
                  value={files}
                 
                >
                  {files.length > 0 &&
                    files.map((file:any) => (
                      <FileItem {...file} onDelete={removeFile} key={file.id} info />
                    ))}
              </Dropzone>
          </div>
          {/* end::Form group */}
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
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
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

export default Solicitacao;

