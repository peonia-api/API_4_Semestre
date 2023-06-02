import { URI, URIcommit, URIgroup, URIgroupToCall } from "../../enumerations/uri";
import axios from "axios";
import { useEffect, useState } from "react";
import './comite.css';
import { avisoConcuidoComite } from "../../controllers/avisoConcluido";
import Header from "../../components/Header";
import '../../App.css';
import Select from "react-select";
import { Groups } from "../../types/group";

export function Comites() {

    const id = window.location.href.split("/")[4];

    const [comite, setComite] = useState("2")
    const [descricao, setDescricao ] = useState("")
    const [descType, setDescType] = useState("");
    const [URL, setUrl] = useState("");
    const [selectedGroup, setSelectedGroup] = useState([] as any);
    const [data, setData] = useState<Groups[]>([]);

    const type = localStorage.getItem('userType');
    const typeCall = localStorage.getItem("typeCall"); 

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log("submint", { comite });
        await axios.put(`${URL}${id}`, { impact: comite , desc: descricao})
        avisoConcuidoComite().then((res) => {
            window.location.assign("/ListagemTipoUsuario");
        })
    }

    async function changeDes() {
        if(type === "CSO" || type === "RT"){
            setDescType("Análise de Risco")
            setUrl(type === "CSO" ? URIcommit.ALTERA_COMITE_CSO : URIcommit.ALTERA_COMITE_RT)
        } else {
            if(typeCall === "hotfix"){
                setUrl(URI.ATUALIZA_HOTFIX)
                setDescType("Prioridade do Hotfix");
            } else {
                setUrl(type === "RT" ? URIcommit.ALTERA_COMITE_RT : URIcommit.ALTERA_COMITE_SQUAD)
                setDescType("Análise de Impacto")
            }
            
        }
    }

    // const getGroupToCall = async (id: any) => {
    //     try {
    //         const response = await axios.get(`${URIgroupToCall.PEGAR_GROUP_TO_CALL_CLIENT}/${id}`);
    //         const listaCliente = response.data;
    //         console.log(listaCliente);
    
    //         listaCliente.forEach((item: any) => {
    //             const emails = item.email;
    
    //             const observer = new UserObserver(emails, item.status, item.titulo);
    //             concreteSubject.addObserver(observer);
    //             console.log(observer);
    //             console.log("Passei por aqui 2");
    //         });
    
    //         setData(listaCliente);
    //     } catch (error) {
    //         console.log('Erro ao obter os dados do grupo de clientes', error);
    //     }
    // };

    useEffect(() => {
        async function fetchGroups() {
            axios
              .get(URIgroup.PEGAR_GRUPO_FUNCIONARIO)
              .then((response) => {
                setData(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          fetchGroups();
        changeDes();
    }, [type, typeCall])      
      
      const options = data.map((data) => ({
        value: data.id,
        label: data.groupName
      }));

    return (
        <>
        <Header /> 
        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
            <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
            <div className="text-center mb-4">
            <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                noValidate
                onSubmit={handleSubmit}
                id="form-solicitacao"
                style={{ margin: "8px" }}
            >

                <div className="align-items mb-4">
                    <h1 className="text-dark mb-3 font-padrao-titulo">
                        Comitê de aprovação
                    </h1>
                </div>

                <div className="row mb-4">
                    <div className="col-lg-12">
                        <div className="fv-row">
                            <label className="form-label fw-bolder text-dark fs-6">
                            Descrição
                            </label>
                            <textarea
                            placeholder="Descrição da avaliação"
                            rows={7}
                            autoComplete="off"
                            className="form-control bg-transparent"
                            onChange={(e) => setDescricao(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-between mb-4">
                    <div className="drop-comite col-md-4">
                        <label htmlFor="rangeAvaliacao" className="form-label text-dark fs-6 mb-3"> {descType} - {type}: {comite}</label>
                        <input onChange={(e) => setComite(e.target.value)} value={comite} type="range" className="form-range" min="0" max="3" id="rangeAvaliacao"></input>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label text-dark fs-6">Grupo responsável:</label>
                        <Select
                            options={options}
                            classNamePrefix="select"
                        />
                    </div>
                </div>

                <div className="button-comite">
                    <button
                        type="button"
                        className="btn btn-form"
                        onClick={handleSubmit}
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
            </form>
        </div>
            </div>
        </div>
        </>
    )
}