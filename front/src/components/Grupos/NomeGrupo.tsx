import clsx from "clsx";
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  groupName: string;
  handleGroupNameChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function Nome({ groupName, handleGroupNameChange, ...props }: Props) {
  return (
    <div className="col-lg-12">
      {/* begin::Form group Nome do time */}
      <div className="fv-row mb-3 col-lg-6">
        <label className="form-label fw-bolder text-dark fs-6">Nome do Grupo</label>
        <input
          placeholder="Nome do Grupo"
          type="text"
          autoComplete="off"
          value={groupName}
          onChange={handleGroupNameChange}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": groupName === "",
            },
            {
              "is-valid": groupName !== "",
            }
          )}
          {...props}
        />
        {groupName === "" && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">Grupo é obrigatório</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group Nome do time */}
    </div>
  );
}