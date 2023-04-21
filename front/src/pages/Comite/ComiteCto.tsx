import { URIcommit } from "../../enumerations/uri";
import axios from "axios";
import { useState } from "react";

export function ComiteCto() {

    const id = window.location.href.split("/")[4];

    const [ comiteCto, setcomiteCto ] = useState("")

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log("submint", {comiteCto});
       
        await axios.put(`${URIcommit.ALTERA_COMITE_CTO}${id}`, {comiImpactCto: comiteCto})
    }

    return (
        <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            onSubmit={handleSubmit}
            id="form-solicitacao"
            style={{ margin: "8px" }}
        >
            <div className="fv-row mb">
                <label className="form-label text-dark fs-6"> Análise de Impacto - CTO </label>
                <select placeholder="Análise de Impacto - CTO" autoComplete="off" value={comiteCto} onChange={(e) => setcomiteCto (e.target.value)} >
                    <option value="" disabled label="Análise de Impacto - CTO"> Análise de Impacto - CTO{" "} </option>
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