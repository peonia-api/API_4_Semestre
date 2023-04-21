import { useFormik } from "formik";
import { initialValues } from "../../types/committee";
import { URIcommit } from "../../enumerations/uri";
import axios from "axios";
import clsx from "clsx";
import registrationSchemaCommit from "../../controllers/validateCommittee";
import { useState } from "react";

export function ComiteCso() {

    const id = window.location.href.split("/")[4];

    const [ comiteCso, setComiteCso ] = useState("")

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log("submint", {comiteCso});
       
        await axios.put(`${URIcommit.ALTERA_COMITE_CSO}${id}`, {comiRiskCso: comiteCso})
    }

    return (
        <form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            onSubmit={handleSubmit}
            id="form-solicitacao"
            style={{ margin: "8px" }}
        >
            <div className="fv-row mb">
                <label className="form-label text-dark fs-6"> Análise de Risco - CSO </label>
                <select placeholder="Análise de Risco - CSO" autoComplete="off" value={comiteCso} onChange={(e) => setComiteCso (e.target.value)} >
                    <option value="" disabled label="Análise de Risco - CSO"> Análise de Risco - CSO{" "} </option>
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