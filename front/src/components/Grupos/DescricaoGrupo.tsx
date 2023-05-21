import { ChangeEventHandler, DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  groupDescription: string,
  handleGroupDescriptionChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export function Descricao({groupDescription, handleGroupDescriptionChange, ...props }: Props) {



    return (
        <>
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
        </>
    )
}