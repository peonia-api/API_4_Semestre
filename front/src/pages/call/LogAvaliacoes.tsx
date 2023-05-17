import { Container, Table } from "react-bootstrap";
import { FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import axios from "axios";
import { URIcommit, URIattach, URI } from "../../enumerations/uri";
import { Calls, LogCall } from "../../types/call";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { log } from "../../utils/log";

function LogAvaliacoes(){

    const url_atual = window.location.href;
    const id = window.location.href.split("/")[4]
  
    const [data, setData] = useState<LogCall[]>([]);
    const [comite, setComite] = useState<LogCall[]>([]);
    //axios get
    useEffect(() => {
      async function fetchCalls() {
        axios
          .get(URIcommit.PEGAR_ARCHIVED_STATUS)
          .then((response) => {
            setData(log(response.data))
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchCalls();
      
    }, []);
    
  
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


    //search
    const [searchQuery, setSearchQuery] = useState<string>("");
    // const filteredData = data.filter(
    //     (item) =>
    //     item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     item.userGroup.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const [display, setDisplay] = useState(false);
      const [description, setDescription] = useState("");

      const handleClose = () => setDisplay(false);
      function handleDisplay(id:any, type:any){
        const descr = data.find(x => x.id === id && x.type === type)?.descricao || ""
        descr == "" ? setDescription("Não Possui Descrição!") : setDescription(descr);
        setDisplay(true);
      };

    return(
        <>
            <Header />
                <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
        
                <div className='container bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
                    <div className="text-center">
                    <h1 className="text-dark mb-0 font-padrao-titulo">
                        Log de Avaliações
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
                        </div>
                        <Table bordered hover responsive>
                        <thead>
                            <tr>
                            {/*cabeçalho tabela*/}
                            <th className="text-center">Chamado</th>
                            <th className="text-center">Tipo de usuário</th>
                            <th className="text-center">Tipo de chamado</th>
                            {/* <th className="text-center">Data da avaliação</th> */}
                            <th className="text-center">Avaliação/Prioridade</th>
                            <th className="text-center">Descrição</th>
                            {/*fim cabeçalho tabela*/}
                            </tr>
                        </thead>
        
                        <tbody>
                            {data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((data) => {
                            return (
                                <tr>
                                {/*corpo tabela*/}
                                <td className="text-center">{data.id}</td>
                                <td className="text-center">{data.type}</td>
                                <td className="text-center">{data.tipoChamado}</td>
                                {/* <td className="text-center">{new Date(data.callDateCreate).toLocaleDateString("pt-BR")}</td> */}
                                <td className="text-center">{data.nota}</td>
                                <td className="text-center">
                                    <Button onClick={() => handleDisplay(data.id, data.type)}>Visualizar</Button>
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
                <Modal show={display} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Descrição</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{description}</Modal.Body>
                </Modal>
        </>
    );
}

export default LogAvaliacoes;