import Header from "../../components/Header";
import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban'
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

function KanbanBoard() {
    
    function createKanbanRemoteDatasource() {
        return new DataManager({
          url: 'https://ej2services.syncfusion.com/production/web-services/api/Kanban',
          adaptor: new ODataAdaptor(),
          crossDomain: true
        });
      }
      
      const kanbanRemoteDatasource = createKanbanRemoteDatasource();

    function kanbanData(): Object[] {
        return [
            {
                "Id": "Task 1",
                "Title": "Task - 29001",
                "Status": "Open",
                "Summary": "Analyze the new requirements gathered from the customer.",
                "Type": "Story",
                "Priority": "Low",
                "Estimate": 3.5,
                "Assignee": "Nancy Davloio"
            },
            {
                "Id": "Task 2",
                "Title": "Task - 29002",
                "Status": "In Progress",
                "Summary": "Improve application performance",
                "Type": "Improvement",
                "Priority": "Normal",
                "Estimate": 6,
                "Assignee": "Andrew Fuller"
            },
            {
                "Id": "Task 3",
                "Title": "Task - 29003",
                "Status": "Open",
                "Summary": "Arrange a web meeting with the customer to get new requirements.",
                "Type": "Others",
                "Priority": "Critical",
                "Estimate": 5.5,
                "Assignee": "Janet Leverling"
            },
            {
                "Id": "Task 4",
                "Title": "Task - 29004",
                "Status": "In Progress",
                "Summary": "Fix the issues reported in the IE browser.",
                "Type": "Bug",
                "Priority": "Critical",
                "Estimate": 2.5,
                "Assignee": "Janet Leverling"
            },
            {
                "Id": "Task 5",
                "Title": "Task - 29005",
                "Status": "Review",
                "Summary": "Fix the issues reported by the customer.",
                "Type": "Bug",
                "Priority": "Low",
                "Estimate": "3.5",
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
                                <ColumnDirective headerText="Para fazer" keyField="Open" />
                                <ColumnDirective headerText="Fazendo" keyField="InProgress" />
                                <ColumnDirective headerText="Feito" keyField="Close" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
            </div>
        </>
    );
}

export default KanbanBoard;