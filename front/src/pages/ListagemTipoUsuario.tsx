import {
  FaSortUp,
  FaSortDown,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { Container, Table, Form, FloatingLabel } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import ReactPaginate from "react-paginate";
import avaliacao from "../images/avaliar.png";
import axios from "axios";
import "../App.css";
import { URI, URIcommit } from "../enumerations/uri";
import { Link } from "react-router-dom";
import { Calls, Status } from "../types/call";
import Header from "../components/Header";
import '../App.css';
import { VerifyType } from "../controllers";

function ListagemTipoUsuario() {
  const linkUrl:any = localStorage.getItem("userType")
  const linkCom:any =  VerifyType(linkUrl);
  //const getCom:any = VerifyTypeList(linkUrl)
  const url_atual = window.location.href;
  const id = window.location.href.split("/")[4]

  const [data, setData] = useState<Calls[]>([]);
  const [commiteData, setCommiteData] = useState<Calls[]>([]);

  //axios get
  useEffect(() => {

    async function fetchCalls() {
      axios
        .get(URI.PEGAR_CALL)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchCalls();
    // async function fetchStatus() {
    //   axios.get(URIcommit.PEGAR_COMITE_STATUS)
    //   .then((res) => {
    //     setCommiteData(res.data)
    //   }).catch((err) => {
    //     console.log("bom");
        
    //   })
    // }
    // fetchStatus();

    async function VerifyTypeList(tipo:any){

      if(tipo === "SQUAD"){
        await axios.get(URIcommit.PEGAR_comiCostSquad_STATUS).then((res) => {
          setCommiteData(res.data)
        })
      }
      else if(tipo === "CSO"){
        await axios.get(URIcommit.PEGAR_comiRiskCso_STATUS).then((res) => {
          setCommiteData(res.data)
        })
      }
      else if(tipo === "RT"){
        await axios.get(URIcommit.PEGAR_comiRiskRt_STATUS).then((res) => {
          setCommiteData(res.data)
        })
      }
      else if(tipo === "CTO"){
        await axios.get(URIcommit.PEGAR_comiImpactCto_STATUS).then((res) => {
          setCommiteData(res.data)
        })
      }
      else if(tipo === "HP"){
        await axios.get(URIcommit.PEGAR_comiImpactHp_STATUS).then((res) => {
          setCommiteData(res.data)
        })
      }
    }

    VerifyTypeList(linkUrl)
    
  }, []);

  console.log(commiteData);
  
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
  const itemsPerPage = 10;
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


  return (
    <>
    <Header /> 
    <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
        <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
        <div className="text-center">
        <h1 className="text-dark fw-bolder mb-0 font-padrao-titulo">
          Listagem dos chamados
        </h1>
      </div>
      <Container className="px-2 mb-5">
        <Container>
          <div className="d-flex align-items-center justify-content-between mt-4 Margin">
            <button type="button" className="btn btn-form" onClick={() => window.location.href = '/solicitacao'}>Adicionar Chamado
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
                {/*cabeçalho tabela*/}
                <th onClick={() => sorting("id")} className="text-center">
                  Número da solitição
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th
                  onClick={() => sorting("callEmail")}
                  className="text-center"
                >
                  Email do solicitante
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th onClick={() => sorting("callType")} className="text-center">
                  Tipo
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th
                  onClick={() => sorting("callTitle")}
                  className="text-center"
                >
                  Título
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th
                  onClick={() => sorting("callPriority")}
                  className="text-center"
                >
                  Status
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th
                  onClick={() => sorting("callDateCreate")}
                  className="text-center"
                >
                  Data de criação
                  {order === "ASC" ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {commiteData.map((data:any) => {
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
                    <td className="text-center">{data.callEmail}</td>
                    <td className="text-center">{data.callType}</td>
                    <td className="text-center">{data.callTitle}</td>
                    {/* {commiteData.map((com:any) => {
                    })} */}
                    <td className="text-center">{data.arquivada}</td>

                    {/* <td className="text-center">{data.callPriority}</td>   */}
                    <td className="text-center">
                      {new Date(data.callDateCreate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="text-center">
                      <Link to={linkCom + data.id}>
                        <img style={{width: '25px'}} src={avaliacao} alt='Comitê' />
                      </Link>
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
          {/*animate*/}
          {data.map((item) => {
            return (
              <div key={item.id} ref={parent} >
                {show === item.id && (
                  <FloatingLabel controlId="floatingLabel" label="Descrição">
                    <Form.Control
                      type="text"
                      defaultValue={item.callDescription}
                      disabled
                    />
                  </FloatingLabel>

                  // <DropComite />
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

export default ListagemTipoUsuario;
