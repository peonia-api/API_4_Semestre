import Header from "../../components/Header";
import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban'
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { useEffect, useState } from "react";
import axios from "axios";
import { URItask } from "../../enumerations/uri";
import { taskBody } from "../../utils/axiosPatch";


function KanbanBoard() {
    const [data, setData] = useState([] as any);

    function createKanbanRemoteDatasource() {
        return new DataManager({
          url: 'https://ej2services.syncfusion.com/production/web-services/api/Kanban',
          adaptor: new ODataAdaptor(),
          crossDomain: true
        });
      }
      const kanbanRemoteDatasource = createKanbanRemoteDatasource();

      useEffect(() => {
        axios.get(URItask.PEGAR_TAKS)
           .then(async (res) => {
              const result = await taskBody(res.data);
              setData(result);
           });
     }, []);
    console.log(data);
    

    function kanbanData(): Object[] {
        return [
            {
                "Id": "Task 1",
                "Title": "Task - 29001",
                "Status": "Aprovada",
                "Summary": "Analyze the new requirements gathered from the customer.",
                "Priority": "Low",
                "Assignee": "Nancy Davloio"
            },
            {
                "Id": "Task 2",
                "Title": "Task - 29002",
                "Status": "Fazendo",
                "Summary": "Improve application performance",
                "Priority": "Normal",
                "Assignee": "Andrew Fuller"
            },
            {
                "Id": "Task 3",
                "Title": "Task - 29005",
                "Status": "Feito",
                "Summary": "Fix the issues reported by the customer.",
                "Priority": "Low",
                "Assignee": "Steven walker"
            }
        ];
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
                        <KanbanComponent id="kanban" keyField="Status" dataSource={kanbanData()} 
                            cardSettings={{ contentField: 'Summary', headerField: 'Id' }} swimlaneSettings={{keyField: 'Assignee'}}>
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