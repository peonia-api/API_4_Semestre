import Header from "../../components/Header";
import '../../App.css';
import React, { useEffect, useState } from "react";
import { Users } from "../../types/user";
import axios from "axios";
import { URIgroup, URIgroupToUser, URIuser } from "../../enumerations/uri";
import { avisoErro } from "../../controllers/avisoErro";
import { avisoConcluido, avisoEdicao } from "../../controllers";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Titulo } from "../../components/Grupos/TituloGrupo";
import { Nome } from "../../components/Grupos/NomeGrupo";
import { Descricao } from "../../components/Grupos/DescricaoGrupo";
import { Botao } from "../../components/Grupos/Botao";
import { SelectCliente } from "../../components/Grupos/SelectCliente";


function EditarGrupoCliente(type:any) {
console.log(type);

    const id = window.location.href.split("/")[4];
    const typeGroup = window.location.href.split("/")[5];
    const [groupName, setGroupName] = useState("");
    const [groupType, setGroupType] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState<Users[]>([]);
    const [userOptions, setUserOptions] = useState<string[]>([]);
    const [user, setUser] = useState<string[]>([]);
    const [ids, setIds] = useState([]);
    const [arleyid, setArleyid] = useState<any[]>([]);
    const [clientes, setClientes] = useState<any[]>([]);
    

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

      axios
        .get(`${type.urlCli}${id}`)
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
                      <Titulo/>

                    {status && (
                <div className="mb-5 alert alert-danger">
                    <div className="alert-text font-weight-bold">{status}</div>
                </div>
                    )}

            <div className="row">
                  <Nome groupName={groupName} handleGroupNameChange={handleGroupNameChange}/>    
                    <div className="col-lg-12">
                        {/* begin::Form group Membros */}
                        <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-dark fs-6">Membros</label>
                    {userOptions.length > 0 &&(
                      <SelectCliente userOptions={userOptions} handleChangeCli={handleChangeCli} clientes={clientes}/>
                    )}
                        
                    </div>
                    </div>
            </div>
            <div className="row">
                <Descricao groupDescription={groupDescription} handleGroupDescriptionChange={handleGroupDescriptionChange}/>        
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4">
                <Botao handleClear={handleClear} veri={veri}/>        
            </div>
          </div>
        {/* end::Form group */}
        </div>  
    </>
    );
}

export default EditarGrupoCliente;