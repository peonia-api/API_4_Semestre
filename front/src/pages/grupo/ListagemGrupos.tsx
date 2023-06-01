
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
import { Container, Table } from "react-bootstrap";
import { FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { avisoErroAoDeletar } from "../../controllers";
import { avisoDeletar, avisoDeletarGrupo } from "../../controllers/avisoConcluido";
import { avisoErroDeletar, avisoChamado } from "../../controllers/avisoErro";
import { URIcommit, URIattach, URI, URIgroupToUser, URIgroup } from "../../enumerations/uri";
import editar from "../../images/editar.png";
import excluir from "../../images/excluir.png";
import grupoImag from "../../images/grupo.png";
import "../../App.css";
import { GroupsToUser } from "../../types/groupToUser";
import { Groups } from "../../types/group";


function ListagemGrupos() {

  const [dataGroup, setGroup] = useState<Groups[]>([]);
  const [data, setData] = useState<GroupsToUser[]>([]);

  //axios get
  useEffect(() => {
    async function fetchGroup() {
      axios
        .get(URIgroup.PEGAR_GROUP)
        .then((response) => {
          setGroup(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchGroup();
    async function fetchGroupToUser() {
      axios
        .get(URIgroupToUser.PEGAR_GROUP_TO_USER)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchGroupToUser();

  }, []);

  console.log(data);
  console.log(dataGroup);
  

  //delete  
  async function handleDeleteGroupUser(id: number) {
    try {
      const groupToUserEntries = data.filter(dataGroup => dataGroup.group.id === id);
      console.log(groupToUserEntries);
      
      const shouldDelete = await avisoDeletarGrupo();
      if (shouldDelete.isConfirmed) {
        if(dataGroup.find((item) => item.id == id && item.groupType == "Funcionario") !=undefined){
          await Promise.all(groupToUserEntries.map(async (groupToUserEntry) => {
            const { id: groupToUserId} = groupToUserEntry;
            await axios.delete(`${URIgroupToUser.DELETE_GROUP_TO_USER}${groupToUserId}`);
          }));
        }
        
          await axios.delete(`${URIgroup.DELETE_GROUP}${id}`).then(() => {  
            setTimeout(() => {
            window.location.reload();
          }, 200);})
          .catch((err) => {
           avisoChamado();
          })

      }

    } catch (error) {
      console.error(error);
      avisoErroDeletar()
    }
  }

  //sort
  const [order, setOrder] = useState<"ASC" | "DSC">("ASC");
  const sorting = (col: keyof typeof data[0]) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };


  let grupo: any = null;
  data.forEach((user) => {
    if (grupo === null) {
      grupo = {
        id: user.group.id,
        usuarios: [],
        usuarioIDs: []
      };
      grupo.usuarios.push(user.user.userName);
      grupo.usuarioIDs.push(user.user.id);
    } else if (user.group.id === grupo.id) {
      grupo.usuarios.push(user.user.userName);
      grupo.usuarioIDs.push(user.user.id);
      console.log(grupo.usuarioIDs);
    }

  });

  const groupedData = data.reduce((result: any, item: any) => {
    if (!result[item.group.id]) {
      result[item.group.id] = {
        id: item.group.id,
        groupType: item.group.groupType,
        usuarios: []
      };
    }
    result[item.group.id].usuarios.push(item.user.userName);
    return result;
  }, {});
  const groupList = Object.values(groupedData);
  console.log(groupedData);
  

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = dataGroup.filter(
    (item) =>
    item.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.groupType.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      <Header />
      <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>

        <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
          <div className="text-center">
            <h1 className="text-dark mb-0 font-padrao-titulo">
              Listagem de Grupos
            </h1>
          </div>
          <Container className="px-2 mb-5">
            <Container>
              <div className="box-search d-flex align-items-center justify-content-between mt-4 Margin">
                <button type="button" className="btn btn-form" onClick={() => window.location.href = '/cadastroGrupo'}>Adicionar Grupo
                  <img src={grupoImag} alt="Botão para adicionar grupos" style={{ width: "25px", height: "25px", marginLeft: "7px" }} />
                </button>

                <input
                  className="input-search"
                  type="text"
                  placeholder="Pesquisar"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    {/*cabeçalho tabela*/}
                    <th onClick={() => sorting("id")} className="text-center">Nome do Grupo {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th className="text-center">Tipo do Grupo</th>
                    <th className="text-center">Ações</th>
                    {/*fim cabeçalho tabela*/}
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((grupo: any) => (
                    <tr key={grupo.id}>
                      {/*corpo tabela*/}
                      <td className="text-center">{grupo.groupName}</td>
                      <td className="text-center">{grupo.groupType}</td>
                      <td className="text-center">
                        {grupo.groupType === "Funcionario"? 
                          <Link to={"/editarGrupoFun/" + grupo.id + "/" + grupo.groupType} style={{ padding: "3px" }}>
                            <img src={editar} style={{ width: '25px' }} alt='Editar' />
                          </Link>
                          :
                          <Link to={"/editarGrupoCli/" + grupo.id + "/" + grupo.groupType} style={{ padding: "3px" }}>
                            <img src={editar} style={{ width: '25px' }} alt='Editar' />
                          </Link>
                        }
                          <img
                            className="actions"
                            style={{ width: "35px", padding: "3px" }}
                            src={excluir}
                            alt="Excluir"
                            onClick={() => handleDeleteGroupUser(grupo.id)}
                          />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ReactPaginate
                pageCount={Math.ceil(data.length / itemsPerPage)}
                onPageChange={handlePageClick}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </Container>
          </Container>
        </div>
      </div>
    </>
  );
  
}

export default ListagemGrupos;