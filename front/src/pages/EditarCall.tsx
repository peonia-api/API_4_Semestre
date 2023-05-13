/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoEdicao, avisoErro, solicitacaoValidationSchema } from "../controllers";
import { URI, URIattach, URIcommit, URIgroup, URIgroupToCall } from "../enumerations/uri";
import { Calls } from "../types/call";
import Header from "../components/Header";
import '../App.css';
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { removeFile, removeFileOne, supabase, uploadFile } from "../services/supabase";
import { Attachment } from "../types/attachment";
import { FloatingLabel, Form } from "react-bootstrap";
import { Committee } from "../types/committee";
import { avisoDeletar, avisoDeletarAnexo, avisoEsperaAnexo } from "../controllers/avisoConcluido";
import { avisoErroDeletar } from "../controllers/avisoErro";
import excluir from "../images/excluir.png";
import Select from "react-select";
import { Groups } from "../types/group";


function EditarCall() {
  const id = window.location.href.split("/")[4];

  const [data, setData] = useState<Calls>();

  const [files, setFiles] = useState([] as any);

  const [anexo, setAnexo] = useState<Attachment[]>([]);

  const [comite, setComite] = useState<Committee[]>([]);

  const [group, setGroup] = useState([]);

  const [idLiga, setidLiga] = useState();

  const [selectedGroup, setSelectedGroup] = useState([] as any);

  const updateFiles = (incommingFiles: any) => {
    //do something with the files
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const removeFiles = (id: any) => {
    setFiles(files.filter((x: any) => x.id !== id));
  };

  console.log(anexo);


  useEffect(() => {
    async function fetchCalls(id: string) {
      axios
        .get(`${URI.PEGAR_CAll_ESPECIFICO}${id}`)
        .then((response) => {
          const fetchedData = response.data;
          setData(fetchedData);
          formik.setValues(fetchedData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchCalls(id);
    async function fetchComites() {
      axios
        .get(URIcommit.PEGAR_COMITE_ALL)
        .then((response) => {
          const fetchedData = response.data;
          setComite(fetchedData);
          formik.setValues(fetchedData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchComites();
    async function fetchAnexo(id: string) {
      try {
        const response = await axios.get(`${URIattach.PEGAR_ANEXO_ESPECIFICO}${id}`);
        setAnexo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAnexo(id)

    async function fetchGroupSelected(id: string) {
      axios
        .get(`${URIgroupToCall.PEGAR_GROUP_TO_CALL_ESPECIFICO}${id}`)
        .then((response) => {
          setidLiga(response.data.map((item: any) => item.id))
          setSelectedGroup(response.data.map((item: any) => ({id: item.id ,value: item.group.id , label:item.group.groupName })));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchGroupSelected(id)

    async function fetchGroup() {
      try {
        const response = await axios.get(URIgroup.PEGAR_GROUP);
        const options = response.data.map((group:any) => ({
          value: group.id,
          label: group.groupName
        }));
        setGroup(options);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGroup();
  }, []);

  console.log(group);
  

  const formik = useFormik({
    initialValues: {
      callType: data?.callType ?? "",
      callEmail: data?.callEmail ?? "",
      callTitle: data?.callTitle ?? "",
      callDescription: data?.callDescription ?? "",
      callPriority: data?.callPriority ?? "",
      //callState: "Inicializado",
      group: selectedGroup,
    },
    validationSchema: solicitacaoValidationSchema,
    initialErrors: { callEmail: "" },
    onSubmit: async (values) => {
      try {
        const updatedData = {
          callType: values.callType,
          callEmail: values.callEmail,
          callTitle: values.callTitle,
          callDescription: values.callDescription,
          callPriority: values.callPriority,
          //callState: values.callState,
          callDateCreate: data?.callDateCreate ?? new Date(),
          group: values.group,
        };

        await axios.put(`${URI.ALTERA_CALL}${id}`, updatedData).then(async (res) => {
          // for (let i = 0; i < selectedGroup.length; i++) {
          //   await axios.post(URIgroupToCall.ENVIAR_GROUP_TO_CALL, { group: selectedGroup[i], call: res.data.id })
          // }
          await axios.put(`${URIgroupToCall.ALTERA_GROUP_TO_CALL}${idLiga}`, { group: selectedGroup.value, call: id }).then((res) => console.log("linux")).catch((rtt) => console.log("deu ruim!"))
          if (formik.values.callType == "feature") {
            await axios.post(URIcommit.ENVIAR_COMITE, { id: id })
          } else {
            if (data?.callType == "feature") {
              if (formik.values.callType == "hotfix") {
                await axios.delete(`${URIcommit.DELETE_COMITE}${id}`)
              }

            }
          }
        })
      } catch (error) {
        console.log(error);
        formik.setStatus("Ocorreu um erro ao atualizar a solicitação.");
      }

      if (files) {
        uploadFile(files).then(async (rest) => {
          console.log(rest);
          await axios.post(`${URIattach.ENVIAR_ANEXO_SUPABASE}${id}`, rest).then((s) => {

          }).catch((err) => {
            console.log(err);
          })
        })
      }

      anexo.map(async (fileData) => {
        console.log(fileData.name);

        await axios.put(`${URIattach.ALTERA_ANEXO_ESPECIFICO_SUPABASE}${id}`, anexo).then(async (res) => {

        })
      })
    },
  });

  function onClickLimpar() {
    formik.resetForm();
  }

  async function handleDeleteFile(idFile: any) {
    try {
      avisoDeletarAnexo().then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${URIattach.DELETE_ANEXO_ONE_SUPABASE}${idFile}`).then(async (res) => {
            removeFileOne(res.data);
            console.log("foi");
            removeFiles(res.data.list)
            const response = await axios.get(`${URIattach.PEGAR_ANEXO_ESPECIFICO}${id}`);
            setAnexo(response.data);
          }).catch((err) => {
            console.log("erro");

          })
        }
      })
    } catch (error) {
      console.error(error);
      avisoErroDeletar();
    }
  }

  const handleSelectChange = (selectedOptions: any) => {
    //const selectedValues = selectedOptions.map((option: any) => option.label); 
    setSelectedGroup(selectedOptions);
    formik.setFieldValue("group", selectedOptions?.value)
  };

  console.log(group);
  console.log(selectedGroup);
  console.log(idLiga);
  

  function onClickEnviar() {
    if (!formik.isValid) {
      avisoErro();
    } else {
      formik.submitForm();
      avisoEsperaAnexo().then((res) => {
        setTimeout(function () {
          avisoEdicao().then((res: any) => {
            setTimeout(function () { window.location.assign("/listagem"); }, 2000)

          })
        }, 3000)
      })

    }
    // <Link to={"/listagem"}/>
  }

  console.log(files);

console.log(formik.values.group);

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
                Editar Solicitação
              </h1>
              <div
                className="text-gray-500 fs-6 font-padrao-titulo mb-5"
                style={{ letterSpacing: 0 }}
              >
                Preencha os campos para atualizar um chamado
              </div>
            </div>

            {formik.status && (
              <div className="mb-5 alert alert-danger">
                <div className="alert-text font-weight-bold">{formik.status}</div>
              </div>
            )}

            <div className="row">
              <div className="col-lg-12">
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
                        "is-invalid": formik.touched.callTitle && formik.errors.callTitle,
                      },
                      {
                        "is-valid": formik.touched.callTitle && !formik.errors.callTitle,
                      }
                    )} />
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
            </div><div className="row">

            </div><div className="row">
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
                        "is-invalid": formik.touched.callType && formik.errors.callType,
                      },
                      {
                        "is-valid": formik.touched.callType && !formik.errors.callType,
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
                placeholder="Selecione o Grupo"
                {...formik.getFieldProps("group")}
                value={selectedGroup}
                onChange={handleSelectChange}
                options={group}
                />
                
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
                        "is-invalid": formik.touched.callDescription &&
                          formik.errors.callDescription,
                      },
                      {
                        "is-valid": formik.touched.callDescription &&
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
                  <div>
                    <label className="form-label fw-bolder text-dark fs-6">Anexos</label>
                    <div className="form-control bg-transparent">
                      {anexo.map((anexo) => (
                        <>
                          <a href={anexo.src} target="_blank" rel="noopener noreferrer">Visualizar anexo</a>
                          <img className="actions" style={{ width: "35px", marginLeft: '-25px' }} src={excluir} alt="Excluir" onClick={() => handleDeleteFile(anexo.id)} />
                        </>
                      ))}
                    </div>
                  </div>

                </div>
                <div className="fv-row mb-3">
                  <label className="form-label fw-bolder text-dark fs-6">
                    Adicionar
                  </label>

                  {/* <Dropzonee callFiles={formik.values.callFiles} setFieldValue={formik.setFieldValue} /> */}
                  <Dropzone
                    style={{ minWidth: "505px" }}
                    onChange={updateFiles}
                    value={files}
                  >
                    {files.length > 0 &&
                      files.map((file: any) => (
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

export default EditarCall;
