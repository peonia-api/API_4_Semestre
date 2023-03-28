import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';
import Solicitacao from "./pages/Solicitacao";
import Historico from "./pages/Historico";
import Perfil from "./pages/Perfil";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <div className="bg-div">

        <Header /> 

        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2'>
          
          <div className='container bg-light border border-dark rounded shadow-lg p-4 mx-auto'>
            <Routes>
              <Route path="/" element={<Solicitacao />} />
              <Route path="/historico" element={<Historico />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
              
        </div>

        <Footer />
        
      </div> 
    </>  
  );
}

export default App;