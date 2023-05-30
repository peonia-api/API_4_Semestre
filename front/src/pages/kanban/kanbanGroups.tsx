import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

function kanbanGroups() {
  // Defina as posições e os tamanhos dos quadradinhos
  const layout = [
    { i: 'equipe1', x: 0, y: 0, w: 2, h: 2 },
    { i: 'equipe2', x: 2, y: 0, w: 1, h: 4 },
    { i: 'equipe3', x: 3, y: 0, w: 1, h: 2 },
    // ... adicione mais equipes aqui
  ];

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
          <div>
            <GridLayout className="layout" layout={layout} cols={4} rowHeight={100} width={800}>
              <div key="equipe1">Equipe 1</div>
              <div key="equipe2">Equipe 2</div>
              <div key="equipe3">Equipe 3</div>
              {/* Adicione mais divs para mais equipes */}
            </GridLayout>
          </div>
        
        </Container>

      </div>
    </div>
      
    </>
  ); 

     
  
}

export default kanbanGroups;