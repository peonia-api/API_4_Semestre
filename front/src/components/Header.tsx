import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Images from "../images/logo_navbar.svg";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
import "../App.css";
import { NavDropdown } from "react-bootstrap";
import perfil from "../images/do-utilizador.png";

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
              <CustomLink to="/listagemCall">MEUS CHAMADOS</CustomLink>
              {tipoUsuario !== "Padrao" ? 
                <>
                  {
                    tipoUsuario === 'Diretor' && (
                      <>
                        <CustomLink to="/arquivar">ARQUIVADOS</CustomLink>
                        <CustomLink to="/logAvaliacoes">LOGS</CustomLink>
                      </>
                    )
                  }
                  <NavDropdown className="me-2" title="GERENCIAR" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="/listagemGrupos">
                        Grupos
                      </NavDropdown.Item>
                      {tipoUsuario !== 'Diretor' &&(
                      <NavDropdown.Item href="/listagemTipoUsuario">
                        Comitê
                      </NavDropdown.Item>
                      )}
                      {
                        tipoUsuario === 'Diretor' && (
                          <>
                            <NavDropdown.Item href="/listagemUser">Usuário</NavDropdown.Item>
                            <NavDropdown.Item href="/listagem">Chamados</NavDropdown.Item>
                          </>
                        )
                      }
                  </NavDropdown>
                </>
                : 
                <>
                  <CustomLink to="/cadastroGrupo">CRIAR GRUPO</CustomLink> 
                  <CustomLink to="/listagemGrupos">GRUPOS</CustomLink>
                </>
                
               }
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
