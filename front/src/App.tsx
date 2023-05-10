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
import { AuthProvider, Private, VerifyCTO, VerifyCso, VerifyHP, VerifyPADRAO, VerifyRT, VerifySQUAD } from "./contexts/auth";
import ListagemTipoUsuario from "./pages/ListagemTipoUsuario";
//import { Comite } from "./pages/Comite";
import { ComiteCso } from "./pages/Comite/ComiteCso";
import { ComiteCto } from "./pages/Comite/ComiteCto";
import { ComiteHp } from "./pages/Comite/ComiteHp";
import { ComiteRt } from "./pages/Comite/ComiteRt";
import { ComiteSquad } from "./pages/Comite/ComiteSquad";
import RedefinirSenha from "./pages/RedefinirSenha";
import Perfil from "./pages/Perfil";
import ListagemGrupos from "./pages/ListagemGrupos";
import EditarGrupos from "./pages/EditarGrupos";
import CadastroGrupos from "./pages/CadastroGrupos";
import ArchivedList from "./pages/Archived";
import LogAvaliacoes from "./pages/Comite/LogAvaliacoes";
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
                  {/* <Route path="/comite/:id" element={<Private><Comite /></Private>} /> */}
                  <Route path="/" element={<Private> <ListagemCall /> </Private>} />
                  <Route path="/comiteCso/:id" element={<VerifyCso><Private> <ComiteCso/> </Private> </VerifyCso>} />
                  <Route path="/comiteCto/:id" element={<VerifyCTO> <Private> <ComiteCto/> </Private> </VerifyCTO>} />
                  <Route path="/comiteHp/:id" element={<VerifyHP> <Private> <ComiteHp/> </Private> </VerifyHP>} />
                  <Route path="/comiteRt/:id" element={<VerifyRT> <Private> <ComiteRt/> </Private></VerifyRT>} />
                  <Route path="/comiteSquad/:id" element={<VerifySQUAD> <Private> <ComiteSquad/> </Private> </VerifySQUAD>} />
                  <Route path="/listagemGrupos" element={<ListagemGrupos />}></Route>
                  <Route path="/editarGrupos" element={<EditarGrupos />}></Route>
                  <Route path="/arquivar" element={<ArchivedList />}></Route>
                  <Route path="/editarGrupos/:id" element={<EditarGrupos />}></Route>
                  <Route path="/logAvaliacoes" element={<LogAvaliacoes />}></Route>
                </Routes>
              </AuthProvider>
              <Footer />
    </>
  );
}

export default App;
