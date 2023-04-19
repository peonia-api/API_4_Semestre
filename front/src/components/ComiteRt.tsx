import { useFormik } from "formik";
import { initialValues } from "../types/committee";
import { URIcommit } from "../enumerations/uri";
import axios from "axios";
import clsx from "clsx";
import registrationSchemaCommit from "../controllers/validateCommittee";

export function ComiteRt() {

    const formik = useFormik({
        initialValues,
        validationSchema: registrationSchemaCommit,
        onSubmit: async (values) => {
            JSON.stringify(values, null, 2);
            // await axios.post(URIcommit.ENVIAR_COMITE);
            await axios.put(URIcommit.ALTERA_COMITE_RT, formik.values);
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
                    Análise de Risco - RT
                </label>
                <select
                    placeholder="Análise de Risco - RT"
                    autoComplete="off"
                    {...formik.getFieldProps("comiRiskRt")}
                    onChange={formik.handleChange}
                    value={formik.values.comiRiskRt}
                    className={clsx(
                        "form-control bg-transparent",
                        {
                            "is-invalid":
                                formik.touched.comiRiskRt && formik.errors.comiRiskRt,
                        },
                        {
                            "is-valid":
                                formik.touched.comiRiskRt && !formik.errors.comiRiskRt,
                        }
                    )}
                >
                    <option value="" disabled label="Análise de Risco - RT">
                        Análise de Risco - RT{" "}
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
                {formik.touched.comiRiskRt && formik.errors.comiRiskRt && (
                    <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                            <span role="alert">{formik.errors.comiRiskRt}</span>
                        </div>
                    </div>
                )}
            </div>
        </form>
    )

}