import Header from "../../components/Header";
import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban'
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { useEffect, useState } from "react";
import axios from "axios";
import { URItask } from "../../enumerations/uri";
import { taskBody } from "../../utils/axiosPatch";


function KanbanBoard() {
    const [data, setData] = useState(Object);
    
      useEffect(() => {
        axios.get(URItask.PEGAR_TAKS)
           .then(async (res) => {
              const result = await taskBody(res.data);
              setData(result);
           });

     }, []);


    return (
        <>
            <Header />
            <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
                <div className='container containerback bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
                    <div className="text-center">
                        <h1 className="text-dark mb-2 font-padrao-titulo">
                            Kanban
                        </h1>
                        <KanbanComponent id="kanban" keyField="Status" dataSource={data} 
                            cardSettings={{ contentField: 'Summary', grabberField: "color", tagsField:'Title', headerField: 'Id' }} swimlaneSettings={{keyField: 'type'}}>
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