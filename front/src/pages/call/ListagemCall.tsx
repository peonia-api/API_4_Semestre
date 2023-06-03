import { FaSortUp, FaSortDown, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Container, Table, Form, FloatingLabel } from "react-bootstrap";
import {  URIattach, URIcommit } from "../../enumerations/uri";
import React, { useState, useEffect, useRef } from "react";
import { Attachment } from "../../types/attachment";
import autoAnimate from "@formkit/auto-animate";
import arquivos from "../../images/paperclip.svg";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header";
import { Calls } from "../../types/call";
import axios from "axios";
import '../../App.css';
import moment from "moment";


function ListagemCall() {

  const url_atual = window.location.href;
  const id = window.location.href.split("/")[4]

  const [data, setData] = useState<Calls[]>([]);
  const [files, setFiles] = useState([]);

  const [anexo, setAnexo] = useState<Attachment[]>([]);

  //axios get
  useEffect(() => {
    async function fetchCalls() {
      axios
        .get(URIcommit.PEGAR_COMITE_STATUS)
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
  // async function handleDeleteCall(id: number) {
  //   try {
  //     avisoDeletar().then(async (result) => {
  //       if (result.isConfirmed) {
  //         data.map(async (dados) => {
  //           if (dados.id == id) {              
  //             await axios.delete(`${URIattach.DELETE_ANEXO_SUPABASE}${id}`).then((res) => {
  //               console.log("foi");
  //               removeFile(res.data.list)
                
  //             }).catch((err) => {
  //               console.log("erro");
                
  //             })
  //             await axios.delete(`${URIgroupToCall.DELETE_GROUP_TO_CALL}${id}`).then((res) => {console.log("linuxxx")}).catch((err) => console.log(err))
  //           }
  //         })

  //         const updatedCalls = data.filter((call) => call.id !== id);
  //         setData(updatedCalls);
  //       }

  //     })

  //   } catch (error) {
  //     console.error(error);
  //     avisoErroDeletar();
  //   }
  // }


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
  const itemsPerPage = 6;

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

  async function fetchAnexo(id: number) {
    try {
      const response = await axios.get(`${URIattach.PEGAR_ANEXO_ESPECIFICO}${id}`);
      setAnexo(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) => {
    console.log(item.callDateFinalization);
    
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    const formattedDateCreate = moment(item.callDateCreate).format('DD/MM/YYYY');
    const formattedDateFinalization = moment(item.callDateFinalization).format('DD/MM/YYYY');
    return (
      item.id.toString().toLowerCase().includes(lowerCaseSearchQuery) ||
      item.callTitle.toLowerCase().includes(lowerCaseSearchQuery) ||
      item.callEmail.toLowerCase().includes(lowerCaseSearchQuery) ||
      item.callType.toLowerCase().includes(lowerCaseSearchQuery) ||
      item.callStatus.toLowerCase().includes(lowerCaseSearchQuery) ||
      formattedDateCreate.includes(lowerCaseSearchQuery) ||
      formattedDateFinalization.includes(lowerCaseSearchQuery)
    );
  });

  return (
    <>
      <Header />
      <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>

        <div className='container containerback bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
          <div className="text-center">
            <h1 className="text-dark mb-0 font-padrao-titulo">
              Listagem dos Chamados
            </h1>
          </div>
          <Container className="px-2 mb-5">
            <Container>
              <div className="d-flex align-items-center justify-content-between mt-4 Margin">
                <button type="button" className="btn btn-form resp" onClick={() => window.location.href = '/solicitacao'}>Adicionar Chamado
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-check-fill" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
                  </svg>
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
                    <th onClick={() => sorting("id")} className="text-center">Número da solicitação {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callEmail")} className="text-center">Email do solicitante {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callType")} className="text-center">Tipo {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callTitle")} className="text-center">Título {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callStatus")} className="text-center">Status {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th onClick={() => sorting("callDateCreate")} className="text-center">Data de criação {order === "ASC" ? <FaSortUp /> : <FaSortDown />} </th>
                    <th className="text-center">Ações</th>
                    {/*fim cabeçalho tabela*/}
                  </tr>
                </thead>

                <tbody>
                  {filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((data) => {
                    return (
                      <tr key={data.id} className="dropdown-label anexo" onClick={() => reveal(data.id)}>
                        {/*corpo tabela*/}
                        <td className="text-center">
                          {/*animate*/}
                          <strong className="dropdown-label anexo" onClick={() => reveal(data.id)}>{data.id}</strong>
                        </td>
                        <td className="text-center">{data.callEmail}</td>
                        <td className="text-center">{data.callType}</td>
                        <td className="text-center">{data.callTitle}</td>
                        <td className="text-center">{data.callStatus}</td>
                        <td className="text-center"> {new Date(data.callDateCreate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="text-center">
                          <img className="actions" style={{ width: "30px", padding: "3px" }} src={arquivos} alt="Arquivos" onClick={() => reveal(data.id)} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <ReactPaginate
                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                onPageChange={handlePageClick}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
              {/*animate*/}
              {data.map((item) => {
                return (
                  <div key={item.id} ref={parent} >
                    {show === item.id && (
                      <FloatingLabel controlId="floatingLabel" label="Descrição">
                        <Form.Control type="text" defaultValue={item.callDescription} disabled />
                        {anexo.filter((anexo) => anexo.call.id === item.id).map((anexo) => (
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

export default ListagemCall;