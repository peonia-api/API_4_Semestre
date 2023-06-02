import Header from '../../components/Header';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { GroupsToUser } from '../../types/groupToUser';
import '../../styles/kanbanGroups.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { URIgroup, URIgroupToUser } from '../../enumerations/uri';
import { Groups } from '../../types/group';

function KanbanGroups() {
  const [dataGroup, setGroup] = useState<Groups[]>([]);


  //axios get
  useEffect(() => {
    async function fetchGroup() {
      axios
        .get(`${URIgroupToUser.PEGAR_GROUP_TO_USER_EMAIL}${localStorage.getItem("userEmail")?.replace(/["]/g, "")}`)
        .then((response) => {
          setGroup(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchGroup();

  }, []);

  console.log(dataGroup);

  return (
    <>
      <Header />
      <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>

        <div className='container containerback bg-light-opacity rounded mx-auto' style={{ padding: "2rem" } }>

          <div className="text-center">
            <h1 className="text-dark mb-0 font-padrao-titulo">
              Equipes
            </h1>
          </div>
            <div className='rodape row mt-5' >
              {dataGroup.map((g: any) => (
                <div className='colStyle col-3'>
                  <a href={'/kanban/' + g.group.id} >{g.group.groupName} </a>
                </div>
              ))}
            </div>  
          

        </div>

      </div>


    </>
  );

}

export default KanbanGroups;