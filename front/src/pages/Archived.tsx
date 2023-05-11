import { FaSortUp, FaSortDown, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Container, Table, Form, FloatingLabel } from "react-bootstrap";
import { URIattach, URIcommit } from "../enumerations/uri";
import React, { useState, useEffect, useRef } from "react";
import { Attachment } from "../types/attachment";
import autoAnimate from "@formkit/auto-animate";
import arquivos from "../images/paperclip.svg";
import ReactPaginate from "react-paginate";
import Header from "../components/Header";
import swal from 'sweetalert2';

import axios from "axios";
import '../App.css';

import { Archived } from "../types/archived";
import Swal from "sweetalert2";
import { icons } from "react-icons/lib";
import { avisoDesarquivar } from "../controllers";


function ArchivedList() {

  const url_atual = window.location.href;
  const id = window.location.href.split("/")[4]

  const [data, setData] = useState<Archived[]>([]);
  const [files, setFiles] = useState([]);
  const [callId, setCallId] = useState(0);
  const [anexo, setAnexo] = useState<Attachment[]>([]);

  //axios get
  useEffect(() => {
    async function fetchCalls() {
      axios
        .get(URIcommit.PEGAR_ARCHIVED_STATUS)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchCalls();
  }, []);
  function Unarchived(callId: any) {
    avisoDesarquivar()
      .then((result) => {
        if (result.isConfirmed) {
          axios.put(`${URIcommit.ALTERA_ARCHIVED_STATUS}${callId}`, {
            status: "Aprovada"
          }).then(() => {
            Swal.fire({
              title: "Reativação concluida com sucesso!",
              icon: "success",
              showConfirmButton: true,
              confirmButtonText: "OK"
            }).then(() => {
              window.location.reload();
            })
          })
        }
      });
  }



  //sort
  const [order, setOrder] = useState<"ASC" | "DSC">("ASC");
  const sorting = (col: keyof typeof data[0]['call']) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a.call[col].toString().toLowerCase() > b.call[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a.call[col].toString().toLowerCase() < b.call[col].toString().toLowerCase()
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

  //animate
  const [show, setShow] = useState<number | null>(null);
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);


  const reveal = async (id: number) => {
    setShow(show === id ? null : id);
    if (show !== id) {
      fetchAnexo(id);
    }
  };

  //pegar anexo
  async function fetchAnexo(id: number) {
    try {
      const response = await axios.get(`${URIattach.PEGAR_ANEXO_ESPECIFICO}${id}`);
      setAnexo(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  //tabela
  return (
    <>
      <Header />
      <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>

        <div className='container containerback bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
          <div className="text-center p-4">
            <h1 className="text-dark mb-0 font-padrao-titulo">
              Listagem de chamados arquivados
            </h1>
          </div>
          <Container className="px-2 mb-5">
            <Container>

              <Table bordered hover responsive>
                <thead>
                  <tr>
                    {/*cabeçalho tabela*/}
                    <th onClick={() => sorting("id")} className="text-center">Número da solicitação {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callType")} className="text-center">Tipo  {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callTitle")} className="text-center">Título  {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callDateCreate")} className="text-center">Data de criação  {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callDateCreate")} className="text-center">Data de finalização {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th className="text-center">Ações</th>
                    {/*fim cabeçalho tabela*/}
                  </tr>
                </thead>

                <tbody>
                  {data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((d) => {


                    return (
                      <tr key={d.call.id}>
                        {/*corpo tabela*/}
                        <td className="text-center">
                          {/*animate*/}
                          <strong className="dropdown-label anexo" onClick={() => reveal(d.call.id)}>{d.call.id}</strong>
                        </td>
                        <td className="text-center">{d.call.callType}</td>
                        <td className="text-center">{d.call.callTitle}</td>
                        <td className="text-center"> {new Date(d.call.callDateCreate).toLocaleDateString("en-GB")}</td>
                        <td className="text-center"> {new Date(d.call.callDateFinalization).toLocaleDateString("en-GB")}
                        </td>
                        <td className="text-center">
                          <a href="" onClick={() => Unarchived(d.call.id)} title="Desarquivar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                            </svg>
                          </a>
                          <img title="Ver Anexo" className="actions" style={{ width: "30px", padding: "3px" }} src={arquivos} alt="Arquivos" onClick={() => reveal(d.call.id)} />
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
              {/*animate*/}
              {data.map((item) => {
                return (
                  <div key={item.call.id} ref={parent} >
                    {show === item.call.id && (
                      <FloatingLabel controlId="floatingLabel" label="Descrição">
                        <Form.Control type="text" defaultValue={item.call.callDescription} disabled />
                        {anexo.filter((anexo) => anexo.call.id === item.call.id).map((anexo) => (
                          <a href={anexo.src} target="_blank" rel="noopener noreferrer">Visualizar anexo</a>
                        ))}
                      </FloatingLabel>
                    )}
                  </div>
                );
              })}
            </Container>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ArchivedList;
