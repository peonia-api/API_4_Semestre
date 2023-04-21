import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.css';
import Solicitacao from "./pages/Solicitacao";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ListagemCall from "./pages/ListagemCall";
import EditarCall from "./pages/EditarCall";
import CadastroUsuario from "./pages/CadastroUsuario";
import ListagemUser from "./pages/ListagemUser";
import EditarUser from "./pages/EditarUser";
import Login from "./pages/Login";
import ListagemCallAdm from "./pages/ListagemCallAdm";
import { AuthProvider, Private } from "./contexts/auth";

function App() {

  return (
    <>
      <div className="bg-div">
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} /> 
              <Route path="/solicitacao" element={<Private><Solicitacao /></Private>} />
              <Route path="/listagem" element={<Private><ListagemCall /></Private>} />
              <Route path="/listagemUser" element={<Private><ListagemUser /></Private>} />
              <Route path="/editarCall/:id" element={<Private><EditarCall /></Private>} />
              <Route path="/cadastroUsuario" element={<Private><CadastroUsuario /></Private>} />
              <Route path="/editarUser/:id" element={<Private><EditarUser /></Private>} />
              <Route path="/listagemCallAdm" element={ <Private><ListagemCallAdm /> </Private>} />
              <Route path="/" element={ <Private> <ListagemCall /> </Private>} />  {/*Retirar depois */}
            </Routes>
          </AuthProvider>
      </div>
      <Footer />

    </>
  );
}

export default App;
