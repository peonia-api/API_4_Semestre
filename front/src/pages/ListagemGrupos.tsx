import { useEffect, useRef, useState } from "react";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
import { Container, Table } from "react-bootstrap";
import { FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { avisoErroAoDeletar } from "../controllers";
import { avisoDeletar } from "../controllers/avisoConcluido";
import { avisoErroDeletar } from "../controllers/avisoErro";
import { URIcommit, URIattach, URI, URIgroupToUser, URIgroup } from "../enumerations/uri";
import { removeFile } from "../services/supabase";
import { Calls } from "../types/call";
import editar from "../images/editar.png";
import excluir from "../images/excluir.png";
import grupo from "../images/grupo.png";
import "../App.css";
import { GroupsToUser } from "../types/groupToUser";
import { Groups } from "../types/group";

function ListagemGrupos() {

    const url_atual = window.location.href;
    const id = window.location.href.split("/")[4]
  
    const [data, setData] = useState<GroupsToUser[]>([]);

  
    //axios get
    useEffect(() => {
      async function fetchCalls() {
        axios
          .get(URIgroupToUser.PEGAR_GROUP_TO_USER)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchCalls();
  
    }, []);
  
    //delete
      async function handleDeleteGroupUser(id: number) {
        data.map((dataGroup)=>{
        try {
          avisoDeletar().then(async (result) => {
            let idGroup = dataGroup.group.id
              if (result.isConfirmed) {
                await axios.delete(`${URIgroupToUser.DELETE_GROUP_TO_USER}${id}`).then(async() => {
                  console.log({id});
                  
                  await axios.delete(`${URIgroup.DELETE_GROUP}${idGroup}`)
                })
                const updatedGroupToUser = data.filter((groupToUser) => groupToUser.id !== id)
                setData(updatedGroupToUser)
            }
          })
        } catch (error) {
          console.error(error);
          avisoErroDeletar();
        }
        })
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
        // Se este for o primeiro usuário, armazene as informações do grupo
        grupo = {
          id: user.group.id,
          usuarios: []
        };
        grupo.usuarios.push(user.user.userName);
      } else if (user.group.id === grupo.id) {
        // Se o ID do grupo deste usuário for igual ao ID do grupo armazenado, adicione o nome do usuário ao array de usuários
        grupo.usuarios.push(user.user.userName);
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


    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
  
    const handlePageClick = (data: { selected: number }) => {
      setCurrentPage(data.selected);
    };
  
    //animate
    const [show, setShow] = useState<number | null>(null);
    const parent = useRef(null);
    useEffect(() => {
      parent.current && autoAnimate(parent.current);
    }, [parent]);

    //search
    const [searchQuery, setSearchQuery] = useState<string>("");
    // const filteredData = data.filter(
    //   (item) =>
    //     item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.userGroup.toLowerCase().includes(searchQuery.toLowerCase())

    // );
  
    return (
      <>
        <Header />
        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
  
          <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
            <div className="text-center">
              <h1 className="text-dark mb-0 font-padrao-titulo">
                Listagem de Equipes
              </h1>
            </div>
            <Container className="px-2 mb-5">
              <Container>
                <div className="box-search d-flex align-items-center justify-content-between mt-4 Margin">
                  <input
                    className="input-search"
                    type="text"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                <button type="button" className="btn btn-form" onClick={() => window.location.href = '/cadastroGrupo'}>Adicionar Equipe
                <img src={grupo} alt="Botão para adicionar grupos" style={{width:"25px", height:"25px", marginLeft:"7px"}}/>
                </button>
                </div>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      {/*cabeçalho tabela*/}
                      <th onClick={() => sorting("id")} className="text-center">Nome da Equipe {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                      <th onClick={() => sorting("group")} className="text-center">Membros</th>
                      <th className="text-center">Ações</th>
                      {/*fim cabeçalho tabela*/}
                    </tr>
                  </thead>
                  <tbody>
                    {groupList.map((grupo: any) => (
                      <tr key={grupo.id}>
                        {/*corpo tabela*/}
                        <td className="text-center">{grupo.groupType}</td>
                        <td className="text-center">{grupo.usuarios.join(", ")}</td>
                        <td className="text-center">
                          <Link to={"/editarGrupos/"} style={{padding: "3px"}}><img src={editar} style={{ width: '25px' }} alt='Editar' /> </Link>
                          <img className="actions" style={{ width: "35px", padding: "3px" }} src={excluir} alt="Excluir" onClick={() => handleDeleteGroupUser(grupo.id)} />
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