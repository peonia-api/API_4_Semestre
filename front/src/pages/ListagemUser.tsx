import {
  FaSortUp,
  FaSortDown,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { Container, Table, Form, FloatingLabel, Nav, Navbar } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import excluir from "../images/excluir.png";
import ReactPaginate from "react-paginate";
import editar from "../images/editar.png";
import axios from "axios";
import "../App.css";
import { URIuser } from "../enumerations/uri";
import { avisoDeletar } from "../controllers/avisoConcluido";
import { avisoErroDeletar } from "../controllers/avisoErro";
import { Link } from "react-router-dom";
import { Users } from "../types/user";



function ListagemUser() {

  const url_atual = window.location.href;
  const id = window.location.href.split("/")[4]

  const [data, setData] = useState<Users[]>([]);

  //axios get
  useEffect(() => {
    async function fetchUsers() {
      axios
        .get(URIuser.PEGAR_USER)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUsers();
  }, []);

  //delete
  async function handleDeleteUser(id: number) {
    try {
     avisoDeletar().then( async (result) => {
        if(result.isConfirmed){
          await axios.delete(`${URIuser.DELETE_USER}${id}`);
          const updatedUsers = data.filter((user) => user.id !== id);
          setData(updatedUsers);
        }
        
      })
      
    } catch (error) {
      console.error(error);
      avisoErroDeletar();
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

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  //animate
  const [show, setShow] = useState<number | null>(null);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  const reveal = (id: number) => {
    setShow(show === id ? null : id);
  };

  //search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredData = data.filter(
    (item) =>
      item.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
   <>
      <Container className="px-2 mb-5">
        <div className="text-center" >
          <h1 className="text-dark fw-bolder mb-0 font-padrao-titulo">
            Listagem dos Usuários
          </h1>
        </div>
        <Container>
          <div className="d-flex align-items-center justify-content-between mt-4 Margin" >
            <input
              className="input-search"
              type="text"
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              // <button type="button"className="btn btn-form">Adicionar Usuário</button>
            />
              <button type="button"className="btn btn-form" onClick={() => window.location.href='/cadastroUsuario'}>Adicionar Usuário
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send-check-fill"
                  viewBox="0 0 16 16">

                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </button>
          </div>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th 
                  onClick={() => sorting("userName")} className="text-center">Nome
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>

                <th
                  onClick={() => sorting("userEmail")}className="text-center">Email 
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>

                <th 
                  onClick={() => sorting("userGroup")} className="text-center">Equipe
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                
                <th
                  onClick={() => sorting("userPosition")}className="text-center">Permissão
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>

                <th className="text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredData
                .slice(pagesVisited, pagesVisited + itemsPerPage)
                .map((data) => {
                  return (
                    <tr key={data.id}>
                      {/*corpo tabela*/}
                      <td className="text-center">
                        {/*animate*/}
                        <strong
                          className="dropdown-label"
                          onClick={() => reveal(data.id)}
                        >
                          {data.id}
                        </strong>
                      </td>
                      <td className="text-center">{data.userName}</td>
                      <td className="text-center">{data.userEmail}</td>
                      <td className="text-center">{data.userGroup}</td>
                      <td className="text-center">{data.userPosition}</td>
                      <td className="text-center">
                        <Link to={"/editar/" + data.id}>
                            <img style={{ width: '25px' }} src={editar} alt='Editar' />
                        </Link>
                        <img
                          style={{ width: "35px" }}
                          src={excluir}
                          alt="Excluir"
                          onClick={() => handleDeleteUser(data.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            {/*pagination*/}
            {data.length > itemsPerPage && (
              <ReactPaginate
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination right"}
                activeClassName={"active"}
              />
            )}
          </Table>
        </Container>
      </Container>
    </>
  );
}

export default ListagemUser;