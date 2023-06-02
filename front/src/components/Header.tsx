import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
import "../App.css";
import { NavDropdown } from "react-bootstrap";

function Header() {
  const { logout } = useContext(AuthContext);

  const signUp = (e: any) => {
    e.preventDefault();
    logout();
  };

  const tipoUsuario = localStorage.getItem("userType")
  const icone:any = localStorage.getItem("icone")

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        variant="dark"
        className="position-fixed w-100 top-0 background-header"
      >
        <Container className="mb-2">
          <Navbar.Brand to="/" as={CustomLink}>
            <img
              src="https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg"
              alt="Logotipo de IONIC Health"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="d-flex" style={{alignItems:"center"}}>
            {tipoUsuario === 'Diretor' &&(
                        <>
                        <CustomLink to="/kanbanGroups">KANBAN</CustomLink>
                        <NavDropdown className="me-2" title="CHAMADOS" id="navbarScrollingDropdown">
                              <NavDropdown.Item href="/listagemCall">
                                Meus chamados
                              </NavDropdown.Item>
                              <NavDropdown.Item href="/listagem">
                                Todos os chamados
                              </NavDropdown.Item>
                              <NavDropdown.Item href="/arquivar">
                                Arquivados
                              </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="me-2" title="GRUPOS" id="navbarScrollingDropdown">
                          <NavDropdown.Item href="/listagemGruposUser">
                            Meus grupos
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/listagemGrupos">
                            Todos os grupos
                          </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="me-2" title="GERENCIAR" id="navbarScrollingDropdown">
                          <NavDropdown.Item href="/listagemUser">
                            Usuários
                          </NavDropdown.Item>
                          <NavDropdown.Item href="/logAvaliacoes">
                            Logs
                          </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown 
                          className="me-2 perfil" 
                          title={
                            <>
                              <img src={icone} alt="Meu Perfil" className="rounded-circle" style={{
                                width: 60,
                                height: 60
                              }} />
                              <span style={{
                                position: "relative",
                                top: 0,
                                right: 35,
                                width: 0,
                                height: 0
                              }}></span>
                            
                            </>
                          }>
                            <NavDropdown.Item className="itemPerfil" href="/perfil">Meu Perfil</NavDropdown.Item>
                            <NavDropdown.Item className="itemPerfil" onClick={signUp}>Sair</NavDropdown.Item>
                        </NavDropdown>
                  </>
                  )}
                </Nav>

                <Nav className="d-flex" style={{alignItems:"center"}}>
                {tipoUsuario === 'Padrao' &&(
                  <>
                    <CustomLink to="/kanbanGroups">KANBAN</CustomLink>
                    <CustomLink to="/listagemCall">CHAMADOS</CustomLink>
                    <CustomLink to="/listagemGruposUser">GRUPOS</CustomLink>
                    <NavDropdown 
                        className="me-2 perfil" 
                        title={
                          <>
                            <img src={icone} alt="Meu Perfil" className="rounded-circle" style={{
                              width: 60,
                              height: 60
                            }} />
                            <span style={{
                              position: "relative",
                              top: 0,
                              right: 35,
                              width: 0,
                              height: 0
                            }}></span>
                          
                          </>
                        }>
                          <NavDropdown.Item className="itemPerfil" href="/perfil">Meu Perfil</NavDropdown.Item>
                          <NavDropdown.Item className="itemPerfil" onClick={signUp}>Sair</NavDropdown.Item>
                      </NavDropdown>
                      : 
                    <>
                    </> 
                  </>
                  )}
                </Nav>

                <Nav className="d-flex" style={{alignItems:"center"}}>
                  {tipoUsuario !== "Padrao" ? 
                    <>
                      {
                        tipoUsuario !== 'Diretor' && (
                          <>
                            <CustomLink to="/kanbanGroups">KANBAN</CustomLink>
                            <CustomLink to="/listagemCall">CHAMADOS</CustomLink>
                            <CustomLink to="/listagemGruposUser">GRUPOS</CustomLink>
                            <CustomLink to="/listagemTipoUsuario">COMITÊ</CustomLink>
                            <NavDropdown 
                              className="me-2 perfil" 
                              title={
                                <>
                                  <img src={icone} alt="Meu Perfil" className="rounded-circle" style={{
                                    width: 60,
                                    height: 60
                                  }} />
                                  <span style={{
                                    position: "relative",
                                    top: 0,
                                    right: 35,
                                    width: 0,
                                    height: 0
                                  }}></span>
                                
                                </>
                              }>
                                <NavDropdown.Item className="itemPerfil" href="/perfil">Meu Perfil</NavDropdown.Item>
                                <NavDropdown.Item className="itemPerfil" onClick={signUp}>Sair</NavDropdown.Item>
                            </NavDropdown>
                          </>
                        )
                      }
                </>
                : 
                <>
                </> 
               }
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function CustomLink({
  to,
  children,
  ...props
}: {
  to: string;
  children: string;
}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Nav.Link
      as={Link}
      to={to}
      className={"me-2" + (isActive ? " active" : "")}
      {...props}
    >
      {children}
    </Nav.Link>
  );
}

export default Header;
