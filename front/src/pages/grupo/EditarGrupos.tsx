import Header from "../../components/Header";
import '../../App.css';
import React, { useEffect, useState } from "react";
import { Users } from "../../types/user";
import axios from "axios";
import { URIgroup, URIgroupToUser, URIuser } from "../../enumerations/uri";
import registrationSchemaUserEditar from "../../controllers/validateUserEditar";
import { avisoErro } from "../../controllers/avisoErro";
import { avisoConcluido, avisoEdicao } from "../../controllers";
import clsx from "clsx";
import Select from 'react-select';
import salvar from "../../images/salvar.png";
import { GroupsToUser } from "../../types/groupToUser";
import { Groups } from "../../types/group";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import CreatableSelect from "react-select/creatable";


function EditarGrupo() {

    const id = window.location.href.split("/")[4];
    const typeGroup = window.location.href.split("/")[5];
    const [groupName, setGroupName] = useState("");
    const [groupType, setGroupType] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    //const [userName, setUserName] = useState("");
    //const [groupId, setGroupId] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState<Users[]>([]);
    const [userOptions, setUserOptions] = useState<string[]>([]);
    const [user, setUser] = useState<string[]>([]);
    const [ids, setIds] = useState([]);
    const [arleyid, setArleyid] = useState<any[]>([]);
    const [clientes, setClientes] = useState<any[]>([]);

    const [selectedValues, setSelectedValues] = useState<any[]>([]);
    

    const schema = Yup.object().shape({
        groupName: Yup.string().required(),
        ...(groupType === "Funcionario"
        ? { user: Yup.array().required("Selecione pelo menos um membro").min(1, "Selecione pelo menos um membro") }
        : {}),
    });

    let location = useNavigate();
    function voltar (){
      location('/listagemGrupos')
    }

    useEffect(() => {
      const typeGroup = window.location.href.split("/")[5];

      if(typeGroup == "Funcionario"){
        axios
          .get(`${URIgroupToUser.PEGAR_GROUP_TO_USER_ESPECIFICO}${id}`)
          .then((response) => {
            console.log(response.data);
            setGroupName(response.data[0].group.groupName);
            setGroupType(response.data[0].group.groupType);
            setGroupDescription(response.data[0].group.groupDescription);
            
            setIds(response.data.map((item:any) => ({id:item.id, name: item.user.userName})))
            setUser(response.data.map((item:any) => ({id:item.id, name: item.user.userName})));
            setUserOptions(response.data.map((item: any) => item.user.userName));

            
          })
          .catch((error) => {
            console.log(error);
          });
          axios
          .get(URIuser.PEGAR_USER)
          .then((response) => {
            const users = response.data.map((item: any) => ({
                id: item.id,
              value: item.userName,
              label: item.userName,
            }));
            setData(users);
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        axios
          .get(`${URIgroup.PEGAR_GROUP_ESPECIFICO}${id}`)
          .then((response) => {
            console.log(response.data);
            setGroupName(response.data.groupName);
            setGroupType(response.data.groupType);
            setGroupDescription(response.data.groupDescription);
            
            const opt = response.data.cliente.replace('{', "").replace('}', "").replace(/["]/g, '')
            setUserOptions(opt.split(","));
            setClientes(opt.split(","))
            
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, []);

  
    
    function veri(e:any){
      if(groupType === "Cliente"){
        if(clientes.length > 0){
          handleSubmit(e)
        }
      }else{
        handleSubmit(e)
      }
    }
    
    function handleSubmit(event:any) {
        event.preventDefault();
      
        schema.validate({ groupName, user}).then(() => {
          const updatedData = {
            groupType: groupType,
            groupName: groupName,
            cliente: clientes,
            groupDescription: groupDescription,
            user: user,
          };
      
          axios
            .put(`${URIgroup.ALTERA_GROUP}${id}`, {groupType: groupType, groupName: groupName, cliente: clientes, groupDescription: groupDescription} )
            .then((res) => {
              if(typeGroup == "Funcionario"){
                ids.map((idG:any) => {
                  if(arleyid.find((item:any) => idG.name === item)){
                    axios.delete(`${URIgroupToUser.DELETE_GROUP_TO_USER}${idG.id}`);
                  }
                })
                user.map((u:any) => {
                  if(arleyid.find((item:any) => u.name === item)){
                    axios.post(URIgroupToUser.ENVIAR_GROUP_TO_USER, {
                      group: id,
                      user: u.id,
                    });
                  }
                })
              }
            })
            .then(() => {
              avisoConcluido().then((result) =>
                result.isConfirmed ? voltar() : ""
              );
            })
            .catch((error) => {
              console.log(error);
              setStatus("Ocorreu um erro ao atualizar a equipe.");
            });
        }).catch((err:any) => {
          avisoErro();
        });
      }
    
     const handleClear = () => {
        setGroupType("");
        setGroupDescription("");
    }

    function handleGroupTypeChange(event:any) {
        setGroupType(event.target.value);
    }

    function handleGroupNameChange(event:any) {
        setGroupName(event.target.value);
    }

    function handleGroupDescriptionChange(event:any) {
        setGroupDescription(event.target.value);
    }

    function handleChangeUser(event:any) {
        console.log(event);
        const val = event.map((item:any) => item.value)
        setUser(event.map((item:any) => ({id:item.id, name: item.value})));
        setArleyid(val.filter((elem:any) => !userOptions.includes(elem)).concat(userOptions.filter((elem:any) => !val.includes(elem))))
    }

    function handleChangeCli(event:any) {
      setClientes(event.map((item:any) => item.value))
    }

  console.log(clientes.length > 0);
  
    
    
    return(
        <>
            <Header />
            <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
                <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
                    <div className="text-center mb-4">
                        <h1 className="text-dark fw-semi-bold mb-3 font-padrao-titulo">
                            Editar Grupo
                        </h1>
                    </div>

                    {status && (
                <div className="mb-5 alert alert-danger">
                    <div className="alert-text font-weight-bold">{status}</div>
                </div>
            )}

            <div className="row">
                <div className="col-lg-12">
                    {/* begin::Form group Nome do time */}
                    <div className="fv-row mb-3 col-lg-6">
                        <label className="form-label fw-bolder text-dark fs-6">Nome do Grupo</label>
                        <input
                            placeholder="Nome do Grupo"
                            type="text"
                            autoComplete="off"
                            value={groupName}
                            onChange={handleGroupNameChange}
                            className={clsx(
                                "form-control bg-transparent",
                                {
                                    "is-invalid":
                                    groupName === "",
                                },
                                {
                                    "is-valid":
                                    groupName !== "",
                                }
                            )}
                        />
                        {groupName === "" && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                    <span role="alert">Grupo é obrigatório</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* end::Form group Nome do time */}
                </div>
                    <div className="col-lg-12">
                        {/* begin::Form group Membros */}
                        <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-dark fs-6">Membros</label>
                    {groupType === "Funcionario" && (
                    <>
                      <Select
                        defaultValue={data.filter(({ value }: any) =>
                          userOptions.includes(value)
                        )}
                        required
                        isMulti
                        name="users"
                        classNamePrefix="select"
                        options={data}
                        onChange={(e) => handleChangeUser(e)}
                        className={clsx("basic-multi-select", {
                          "is-invalid": user.length < 1,
                          "is-valid": user.length > 0,
                        })}
                      />
                      {user.length === 0 && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">Selecione pelo menos um usuário</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                    {groupType == "Cliente" && userOptions.length > 0 &&(
                    <>
                      <CreatableSelect
                      defaultValue={userOptions.map((item) => ({ value: item, label: item }))}
                      required
                      isMulti
                      name="clients"
                      className="basic-multi-select"
                      options={[
                        {
                          label: "Users",
                          options: userOptions.map((item) => ({
                            value: item,
                            label: item,
                          })),
                        },
                      ]}
                      classNamePrefix="select"
                      onChange={(e) => handleChangeCli(e)}
                      id="slcMembros"
                      placeholder="Digite os emails dos clientes"
                      />
                      {clientes.length === 0 && (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                                <span role="alert">Selecione pelo menos um usuário</span>
                            </div>
                        </div>
                      )}
                    </>
                    )}
                        
                    </div>
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
                            placeholder="Descrição da equipe"
                            rows={5}
                            autoComplete="off"
                            value={groupDescription}
                            onChange={handleGroupDescriptionChange}
                            className="form-control bg-transparent"
                        />

                    </div>
                    {/* end::Form group Descrição */}
            </div>
                {/* begin::Form group */}
                <div className="d-flex align-items-center justify-content-between mt-4">
                    <button type="button" className="btn btn-form" onClick={handleClear}>
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
                        onClick={(e) => (veri (e))}
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

export default EditarGrupo;