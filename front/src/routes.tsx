import Footer from "./components/Footer";
import './App.css';
import Solicitacao from "./pages/call/Solicitacao";
import { Route, Routes } from "react-router-dom";
import ListagemCall from "./pages/call/ListagemCall";
import EditarCall from "./pages/call/EditarCall";
import CadastroUsuario from "./pages/user/CadastroUsuario";
import ListagemUser from "./pages/user/ListagemUser";
import EditarUser from "./pages/user/EditarUser";
import Login from "./pages/login/Login";
import { Private, VerifyPADRAO, VerifySQUAD } from "./contexts/auth";
import ListagemTipoUsuario from "./pages/Comite/ListagemTipoUsuario";
import { ComiteSquad } from "./pages/Comite/ComiteSquad";
import RedefinirSenha from "./pages/login/RedefinirSenha";
import Perfil from "./pages/user/Perfil";
import ListagemGrupos from "./pages/grupo/ListagemGrupos";
import CadastroGrupos from "./pages/grupo/CadastroGrupos";
import ArchivedList from "./pages/call/Archived";
import LogAvaliacoes from "./pages/call/LogAvaliacoes";
import CadastroGrupo from "./pages/grupo/CadastroGrupos";
import { Comites } from "./pages/Comite/Comites";
import { URIgroup, URIgroupToUser, URIuser } from "./enumerations/uri";
import ListagemCallUser from "./pages/call/ListagemCallDoUsuario";
import EditarGrupoFuncionario from "./pages/grupo/EditarGrupoFunc";
import EditarGrupoCliente from "./pages/grupo/EditarGrupoClien"; 
import KanbanBoard from "./pages/kanban/kanban";


function Rotas(){
    return(
        <>
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
            <Route path="/editarGrupoFun/:id/:type" element={<Private><EditarGrupoFuncionario type={"Funcionario"} urlUser={URIuser.PEGAR_USER} urlFun={URIgroupToUser.PEGAR_GROUP_TO_USER_ESPECIFICO}/></Private>}></Route>
            <Route path="/editarGrupoCli/:id/:type" element={<Private><EditarGrupoCliente type={"Cliente"} urlCli={URIgroup.PEGAR_GROUP_ESPECIFICO} /></Private>}></Route>
            <Route path="/arquivar" element={<Private><ArchivedList /></Private>}></Route>
            <Route path="/cadastroGrupo" element={<Private><CadastroGrupo/></Private>}></Route>
            <Route path="/logAvaliacoes" element={<Private><LogAvaliacoes /></Private>}></Route>
            <Route path="/kanban" element={<KanbanBoard/>}></Route>
        </Routes>
        <Footer />
        </>
     
    )
}

export default Rotas