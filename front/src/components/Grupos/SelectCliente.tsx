import CreatableSelect from "react-select/creatable";

interface props{
    userOptions: string[],
    handleChangeCli: Function,
    clientes: any[]
}

export function SelectCliente({userOptions, handleChangeCli, clientes}:props) {



    return (
        <>
            <CreatableSelect
                defaultValue={userOptions.map((item) => ({ value: item, label: item }))}
                required
                isMulti
                name="clients"
                className="basic-multi-select"
                options={[
                    {
                        label: "Users",
                        options: userOptions.map((item) => ({
                            value: item,
                            label: item,
                        })),
                    },
                ]}
                classNamePrefix="select"
                onChange={(e) => handleChangeCli(e)}
                id="slcMembros"
                placeholder="Digite os emails dos clientes"
            />
            {clientes.length === 0 && (
                <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                        <span role="alert">Selecione pelo menos um usuário</span>
                    </div>
                </div>
            )}
        </>
    )
}