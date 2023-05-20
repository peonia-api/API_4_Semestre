import clsx from 'clsx';
import Select from 'react-select';
import { Users } from '../../types/user';

interface props{
    data:Users[],
    userOptions:string[],
    handleChangeUser: Function,
    user:string[]
}

export function SelectFuncionario({data, userOptions, handleChangeUser, user}:props ){

    return (
        <>
            <Select
                defaultValue={data.filter(({ value }: any) =>
                    userOptions.includes(value)
                )}
                required
                isMulti
                name="users"
                classNamePrefix="select"
                options={data}
                onChange={(e) => handleChangeUser(e)}
                className={clsx("basic-multi-select", {
                    "is-invalid": user.length < 1,
                    "is-valid": user.length > 0,
                })}
            />
            {user.length === 0 && (
                <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                        <span role="alert">Selecione pelo menos um usuário</span>
                    </div>
                </div>
            )}
        </>
    )
}