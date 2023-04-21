import { URIcommit } from "../../enumerations/uri";
import axios from "axios";
import { useState } from "react";
import { avisoConcuidoComite } from "../../controllers/avisoConcluido";
import Header from "../../components/Header";
import '../../App.css';

export function ComiteSquad() {

    const id = window.location.href.split("/")[4];

    const [ comiteSquad, setcomiteSquad ] = useState("")

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log("submint", {comiteSquad});
        await axios.put(`${URIcommit.ALTERA_COMITE_SQUAD}${id}`, {comiCostSquad: comiteSquad})
        avisoConcuidoComite()
    }

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
                    <h1 className="text-dark fw-bolder mb-3 font-padrao-titulo">
                        Comitê de aprovação
                    </h1>
                </div>

                <div className="drop-comite">
                    <label className="form-label text-dark fs-6"> Análise de Custo - SQUAD </label>
                    <select className="form-control bg-transparent" placeholder="Análise de Custo - SQUAD" 
                        autoComplete="off" value={comiteSquad} onChange={(e) => setcomiteSquad(e.target.value)} >

                        <option value="" disabled label="Análise de Custo - SQUAD"> Análise de Custo - SQUAD{" "} </option>
                        <option value="0" label="0"> 0 </option>
                        <option value="1" label="1"> 1 </option>
                        <option value="2" label="2"> 2 </option>
                        <option value="3" label="3"> 3 </option>
                    </select>
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