import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';
import Solicitacao from "./pages/Solicitacao";
import Perfil from "./pages/Perfil";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ListagemCall from "./pages/ListagemCall";
import EditarCall from "./pages/EditarCall";

function App() {

  return (
    <>
      <div className="bg-div">

        <Header /> 

        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
          
          <div className='container bg-light-opacity rounded mx-auto' style={{padding:"2rem"}}>
            <Routes>
                <Route path="/" element={<Solicitacao />} />
                <Route path="/listagem" element={<ListagemCall />} />
                <Route path="editar/:id" element={<EditarCall />} />
            </Routes>
          </div>
              
        </div>
        
      </div> 
      <Footer />

    </>  
  );
}

export default App;



 
