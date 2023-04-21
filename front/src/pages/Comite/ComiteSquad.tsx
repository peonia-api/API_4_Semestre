import { URIcommit } from "../../enumerations/uri";
import axios from "axios";
import { useState } from "react";

export function ComiteSquad() {

    const id = window.location.href.split("/")[4];

    const [ comiteSquad, setcomiteSquad ] = useState("")

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log("submint", {comiteSquad});
       
        await axios.put(`${URIcommit.ALTERA_COMITE_SQUAD}${id}`, {comiCostSquad: comiteSquad})
    }

    return (
        <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            onSubmit={handleSubmit}
            id="form-solicitacao"
            style={{ margin: "8px" }}
        >
            <div className="fv-row mb">
                <label className="form-label text-dark fs-6"> Análise de Custo - SQUAD </label>
                <select placeholder="Análise de Custo - SQUAD" autoComplete="off" value={comiteSquad} onChange={(e) => setcomiteSquad (e.target.value)} >
                    <option value="" disabled label="Análise de Custo - SQUAD"> Análise de Custo - SQUAD{" "} </option>
                    <option value="0" label="0"> 0 </option>
                    <option value="1" label="1"> 1 </option>
                    <option value="2" label="2"> 2 </option>
                    <option value="3" label="3"> 3 </option>
                </select>
            </div>
            <button type="button" onClick={handleSubmit}>
                Clique aqui!
            </button>
        </form>
    )

}