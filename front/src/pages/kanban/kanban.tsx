import Header from "../../components/Header";
import { ColumnDirective, ColumnsDirective, DialogEventArgs, KanbanComponent, cardClick } from '@syncfusion/ej2-react-kanban'
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { useEffect, useState } from "react";
import axios from "axios";
import { URItask } from "../../enumerations/uri";
import { taskBody } from "../../utils/axiosPatch";


function KanbanBoard(this: any) {
    const [data, setData] = useState(Object);

      useEffect(() => {
        const id = window.location.href.split("/")[4];
        axios.get(`${URItask.PEGAR_TAKS}${id}`)
           .then(async (res) => {
              const result = await taskBody(res.data);
              setData(result);
           });

     }, []);

     const changeStatus = (id:any, newStatus:any) => {
        if(newStatus === 'Feito'){newStatus = 'Finalizado'}
        axios.patch(URItask.PATCH_TAKS, {
            id: id,
            status: newStatus
        })
      }

      function DialogOpen(args: DialogEventArgs): void {
        args.cancel = true;
    }

    return (
        <>
            <Header />
            <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
                <div className='container containerback bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
                    <div className="text-center">
                        <h1 className="text-dark mb-2 font-padrao-titulo">
                            Kanban
                        </h1>
                        <KanbanComponent id="kanban" keyField="Status" dataSource={data} dragStop={(e) => { changeStatus(e.data[0].Id, e.data[0].Status); }}
                            cardSettings={{ contentField: 'Summary', grabberField: "color", tagsField:'Title', headerField: 'Id'}}  swimlaneSettings={{keyField: 'type'}}  dialogOpen={DialogOpen.bind(this)}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="Para fazer" keyField="Aprovada" />
                                <ColumnDirective headerText="Fazendo" keyField="Fazendo" />
                                <ColumnDirective headerText="Feito" keyField="Feito" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
            </div>
        </>
    );
}

export default KanbanBoard;