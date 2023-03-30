import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';
import Solicitacao from "./pages/Solicitacao";
import Perfil from "./pages/Perfil";
import { Route, Routes } from "react-router-dom";
import ListagemCall from "./pages/ListagemCall";

function App() {

  return (
    <>
      <body className="bg-div">

        <Header /> 

        <div className='d-flex flex-center flex-column flex-column-fluid hf-spacing px-2 mt-5'>
          
          <div className='container bg-light-opacity rounded mx-auto' style={{padding:"2rem"}}>
            <Routes>
              <Route path="/" element={<Solicitacao />} />
              <Route path="/listagem" element={<ListagemCall />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
              
        </div>
        
      </body> 
      <Footer />

    </>  
  );
}

export default App;