import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import clsx from "clsx";
import "../App.css";
import axios from "axios";
import { avisoConcluido, avisoErro } from "../controllers";
import registrationSchemaUser from "../controllers/validateGroup";
import { URIgroup, URIgroupToUser, URIuser } from "../enumerations/uri";
import { initialValues } from "../types/group";
import Header from "../components/Header";
import '../App.css';
import { Users } from "../types/user";
import Select from 'react-select';


function CadastroGrupos() {
  const [data, setData] = useState<Users[]>([]);
  const [selectedUsers, setSelectedUsers] = useState([] as any);

  useEffect(() => {
    async function fetchUsers() {
      axios
        .get(URIuser.PEGAR_USER)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUsers();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchemaUser,
    initialErrors: { groupType: "" },
    onSubmit: async (values) => {
      JSON.stringify(values, null, 2);
      await axios.post(URIgroup.ENVIAR_GROUP, formik.values)
        .then(async (res) => {
          const groupId = res.data.id;
          for (let i = 0; i < selectedUsers.length; i++) {
            await axios.post(URIgroupToUser.ENVIAR_GROUP_TO_USER, { group: groupId, user: selectedUsers[i] })
          }
        });
      onClickLimpar();
      setSelectedUsers([]);
    },
  });

  function onClickLimpar() {
    formik.resetForm();
    setSelectedUsers([]);
  }

  function onClickEnviar() {
    if (!formik.isValid) {
      avisoErro();
    } else {
      formik.submitForm();
      avisoConcluido();
    }
  }

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setSelectedUsers(selectedValues);
  };

  const options = data.map((data) => ({
    value: data.id,
    label: data.userName
  }));

  console.log(selectedUsers);

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
                Cadastrar Grupo
              </h1>
              <div
                className="text-gray-500 fs-6 font-padrao-titulo mb-5"
                style={{ letterSpacing: 0 }}
              >
                Preencha os campos e defina a permissão para cadastrar um novo grupo
              </div>
            </div>

            {formik.status && (
              <div className="mb-5 alert alert-danger">
                <div className="alert-text font-weight-bold">{formik.status}</div>
              </div>
            )}

            <div className="row">
              <div className="col-lg-6">
                <div className="fv-row mb-4">
                  <label className="form-label fw-bolder text-dark fs-6">Nome</label>
                  <input
                    placeholder="Nome do usuário"
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
              </div>
            </div>

            <div className="row">
              <div className="fv-row mb-3">
                <Select
                  defaultValue={options.filter(({ value }) => selectedUsers.includes(value))}
                  isMulti
                  name="users"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                />
              </div>

            </div>

            <div className="row">
              <div className="col-lg-12">
                {/* begin::Form group Descrição */}
                <div className="fv-row mb-3">
                  <label className="form-label fw-bolder text-dark fs-6"> Descrição </label>
                  <textarea
                    placeholder="Descrição da solicitação"
                    rows={5}
                    autoComplete="off"
                    {...formik.getFieldProps("groupDescription")}
                    onChange={formik.handleChange}
                    value={formik.values.groupDescription}
                    className={clsx(
                      "form-control bg-transparent",
                      {
                        "is-invalid": formik.touched.groupDescription &&
                          formik.errors.groupDescription,
                      },
                      {
                        "is-valid": formik.touched.groupDescription &&
                          !formik.errors.groupDescription,
                      }
                    )}
                  ></textarea>
                  {formik.touched.groupDescription &&
                    formik.errors.groupDescription && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.groupDescription}</span>
                        </div>
                      </div>
                    )}
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
export default CadastroGrupos;