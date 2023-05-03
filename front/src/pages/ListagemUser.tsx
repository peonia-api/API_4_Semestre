import {FaSortUp, FaSortDown, FaChevronRight, FaChevronLeft} from "react-icons/fa";
import { avisoDeletar } from "../controllers/avisoConcluido";
import { avisoErroDeletar } from "../controllers/avisoErro";
import React, { useState, useEffect, useRef } from "react";
import { Container, Table } from "react-bootstrap";
import autoAnimate from "@formkit/auto-animate";
import { URIuser } from "../enumerations/uri";
import excluir from "../images/excluir.png";
import ReactPaginate from "react-paginate";
import Header from "../components/Header";
import editar from "../images/editar.png";
import { Link } from "react-router-dom";
import { Users } from "../types/user";
import axios from "axios";
import "../App.css";

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
      avisoDeletar().then(async (result) => {
        if (result.isConfirmed) {
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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };


  return (
    <>
      <Header />
      <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
        <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
          <Container className="px-2 mb-5">
            <div className="text-center">
              <h1 className="text-dark mb-0 font-padrao-titulo">Listagem dos Usuários</h1>
            </div>
            <Container>
              <div className="d-flex align-items-center justify-content-between mt-4 Margin" >
                <button type="button" className="btn btn-form" onClick={() => window.location.href = '/cadastroUsuario'}>Adicionar Usuário
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </button>
              </div>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th onClick={() => sorting("userName")} className="text-center">Nome{order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                    <th onClick={() => sorting("userEmail")} className="text-center">Email{order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                    <th onClick={() => sorting("userType")} className="text-center">Tipo do usuário{order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                    <th onClick={() => sorting("userPosition")} className="text-center">Cargo {order === "ASC" ? <FaSortUp /> : <FaSortDown />}</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((data) => {
                    return (
                      <tr key={data.id}>
                        {/*corpo tabela*/}
                        <td className="text-center">{data.userName}</td>
                        <td className="text-center">{data.userEmail}</td>
                        <td className="text-center">{data.userType}</td>
                        <td className="text-center">{data.userPosition}</td>
                        <td className="text-center"> <Link to={"/editarUser/" + data.id}><img style={{ width: '25px' }} src={editar} alt='Editar' /> </Link>
                          <img style={{ width: "35px" }} src={excluir} alt="Excluir" onClick={() => handleDeleteUser(data.id)}/>
                        </td>
                      </tr>
                    );
                  })}
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

export default ListagemUser;