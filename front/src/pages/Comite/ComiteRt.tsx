import { URIcommit } from "../../enumerations/uri";
import axios from "axios";
import { useState } from "react";

export function ComiteRt() {

    const id = window.location.href.split("/")[4];

    const [ comiteRt, setcomiteRt ] = useState("")

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log("submint", {comiteRt});
       
        await axios.put(`${URIcommit.ALTERA_COMITE_RT}${id}`, {comiRiskRt: comiteRt})
    }

    return (
        <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            onSubmit={handleSubmit}
            id="form-solicitacao"
            style={{ margin: "8px" }}
        >
            <div className="fv-row mb">
                <label className="form-label text-dark fs-6"> Análise de Risco - RT </label>
                <select placeholder="Análise de Risco - RT" autoComplete="off" value={comiteRt} onChange={(e) => setcomiteRt (e.target.value)} >
                    <option value="" disabled label="Análise de Risco - RT"> Análise de Risco - RT{" "} </option>
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