import { useFormik } from "formik";
import { initialValues } from "../types/committee";
import { URIcommit } from "../enumerations/uri";
import axios from "axios";
import clsx from "clsx";
import registrationSchemaCommit from "../controllers/validateCommittee";

export function ComiteSquad() {

    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchemaCommit,
        onSubmit: async (values) => {
            JSON.stringify(values, null, 2);
            // await axios.post(URIcommit.ENVIAR_COMITE);
            await axios.put(URIcommit.ALTERA_COMITE_SQUAD, formik.values);
        },
    });

    return (
        <form
            className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            noValidate
            id="form-solicitacao"
            onSubmit={formik.handleSubmit}
            style={{ margin: "8px" }}
        >
            <div className="fv-row mb">
                <label className="form-label text-dark fs-6">
                    Análise de Custo - SQUAD
                </label>
                <select
                    placeholder="Análise de Custo - SQUAD"
                    autoComplete="off"
                    {...formik.getFieldProps("comiCostSquad")}
                    onChange={formik.handleChange}
                    value={formik.values.comiCostSquad}
                    className={clsx(
                        "form-control bg-transparent",
                        {
                            "is-invalid":
                                formik.touched.comiCostSquad && formik.errors.comiCostSquad,
                        },
                        {
                            "is-valid":
                                formik.touched.comiCostSquad && !formik.errors.comiCostSquad,
                        }
                    )}
                >
                    <option value="" disabled label="Análise de Custo - SQUAD">
                        Análise de Custo - SQUAD{" "}
                    </option>
                    <option
                        value="0"
                        onChange={formik.handleChange}
                        label="0"
                    >
                        0
                    </option>
                    <option
                        value="1"
                        onChange={formik.handleChange}
                        label="1"
                    >
                        1
                    </option>
                    <option
                        value="2"
                        onChange={formik.handleChange}
                        label="2"
                    >
                        2
                    </option>
                    <option
                        value="3"
                        onChange={formik.handleChange}
                        label="3"
                    >
                        3
                    </option>
                </select>
                {formik.touched.comiCostSquad && formik.errors.comiCostSquad && (
                    <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                            <span role="alert">{formik.errors.comiCostSquad}</span>
                        </div>
                    </div>
                )}
            </div>
        </form>
    )

}