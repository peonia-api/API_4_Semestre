import { Container, Row, Col } from 'react-grid-system';
import Header from '../../components/Header';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function kanbanGroups() {
  
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };
  
  const colStyle: React.CSSProperties = {
    backgroundColor: 'green',
    color: 'white',
    padding: '90px',
    margin: '20px',
    borderRadius: '30px',
    width: '400%', // Defina a largura desejada aqui, por exemplo, '300px'
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
  };

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
        <div style={containerStyle}>
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3} style={colStyle}>
            <div style={contentStyle}>Equipe 1</div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} style={colStyle}>
            <div style={contentStyle}>Equipe 2</div>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} style={colStyle}>
            <div style={contentStyle}>Equipe 3</div>
          </Col>
          {/* Adicione mais Col para mais equipes */}
        </Row>
      </Container>
    </div>

      </div>
    </div>
      
    </>
  ); 

}

export default kanbanGroups;