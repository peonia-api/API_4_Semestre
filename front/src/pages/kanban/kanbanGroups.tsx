import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function kanbanGroups() {
  const colStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '40px',
    margin: '30px',
    borderRadius: '20px',
  };
  // Defina as posições e os tamanhos dos quadradinhos
  // const layout = [
  //   { i: 'equipe1', x: 0, y: 0, w: 2, h: 2 },
  //   { i: 'equipe2', x: 2, y: 0, w: 1, h: 4 },
  //   { i: 'equipe3', x: 3, y: 0, w: 1, h: 2 },
  //   // ... adicione mais equipes aqui
  // ];

  return (
    <>
    <Header />
    <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>

      <div className='container containerback bg-light-opacity rounded mx-auto' style={{ padding: "2rem" }}>
        <div className="text-center">
          <h1 className="text-dark mb-0 font-padrao-titulo">
            Equipes
          </h1>
        </div>

        <Container>
        <Row>
        <Col xs={12} sm={6} md={4} lg={3} style={colStyle}>
          Equipe 1
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} style={colStyle}>
          Equipe 2
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} style={colStyle}>
          Equipe 3
        </Col>
        {/* Adicione mais Col para mais equipes */}
      </Row>
          
        </Container>

      </div>
    </div>
      
    </>
  ); 

     
  
}

export default kanbanGroups;