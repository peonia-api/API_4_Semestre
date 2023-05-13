import Footer from "./components/Footer";
import './App.css';
import Solicitacao from "./pages/Solicitacao";
import { Route, Routes } from "react-router-dom";
import ListagemCall from "./pages/ListagemCall";
import EditarCall from "./pages/EditarCall";
import CadastroUsuario from "./pages/CadastroUsuario";
import ListagemUser from "./pages/ListagemUser";
import EditarUser from "./pages/EditarUser";
import Login from "./pages/Login";
import { AuthProvider, Private, VerifyCTO, VerifyCso, VerifyHP, VerifyPADRAO, VerifyRT, VerifySQUAD } from "./contexts/auth";
import ListagemTipoUsuario from "./pages/ListagemTipoUsuario";
import { ComiteSquad } from "./pages/Comite/ComiteSquad";
import RedefinirSenha from "./pages/RedefinirSenha";
import Perfil from "./pages/Perfil";
import ListagemGrupos from "./pages/ListagemGrupos";
import EditarGrupos from "./pages/EditarGrupos";
import CadastroGrupos from "./pages/CadastroGrupos";
import ArchivedList from "./pages/Archived";
import LogAvaliacoes from "./pages/LogAvaliacoes";
import CadastroGrupo from "./pages/CadastroGrupos";
import { Comites } from "./pages/Comite/Comites";
import { URIcommit } from "./enumerations/uri";
import ListagemCallUser from "./pages/ListagemCallDoUsuario";

function App() {
  return (
    <>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />                  
            <Route path="/perfil" element={<Private><Perfil /></Private>} />
            <Route path="/redefinirSenha/:id" element={<RedefinirSenha />} />
            <Route path="/solicitacao" element={<Private><Solicitacao /></Private>} />
            <Route path="/listagem" element={<Private><ListagemCall /></Private>} />
            <Route path="/listagemCall" element={<Private><ListagemCallUser /></Private>} />
            <Route path="/listagemUser" element={<VerifyPADRAO><Private><ListagemUser /></Private></VerifyPADRAO>} />
            <Route path="/editarCall/:id" element={<Private><EditarCall /></Private>} />
            <Route path="/cadastroUsuario" element={<Private><CadastroUsuario /></Private>} />
            <Route path="/cadastroGrupo" element={<Private><CadastroGrupos /></Private>} />
            <Route path="/editarUser/:id" element={<Private><EditarUser /></Private>} />
            <Route path="/listagemTipoUsuario" element={<VerifyPADRAO> <Private><ListagemTipoUsuario  /></Private></VerifyPADRAO>} />
            <Route path="/" element={<Private> <ListagemCallUser /> </Private>} />
            <Route path="/comites/:id" element={<Private> <Comites /> </Private> } />
            <Route path="/comiteSquad/:id" element={<VerifySQUAD> <Private> <ComiteSquad/> </Private> </VerifySQUAD>} />
            <Route path="/listagemGrupos" element={<Private><ListagemGrupos /></Private>}></Route>
            <Route path="/editarGrupo/:id/:type" element={<Private><EditarGrupos /></Private>}></Route>
            <Route path="/arquivar" element={<Private><ArchivedList /></Private>}></Route>
            <Route path="/cadastroGrupo" element={<Private><CadastroGrupo/></Private>}></Route>
            <Route path="/logAvaliacoes" element={<Private><LogAvaliacoes /></Private>}></Route>
          </Routes>
        </AuthProvider>
        <Footer />
    </>
  );
}

export default App;
