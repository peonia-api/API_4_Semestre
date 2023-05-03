import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Images from "../images/logo_navbar.svg";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
import "../App.css";

function Header() {
  const { logout } = useContext(AuthContext);

  const signUp = (e: any) => {
    e.preventDefault();
    logout();
  };
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
            <Nav>
              <CustomLink to="/listagem">CHAMADO</CustomLink>
              <CustomLink to="/listagemUser">USUÁRIO</CustomLink>
              <CustomLink to="/listagemGrupos">EQUIPES</CustomLink>
              <Nav.Link onClick={signUp}>LOGOUT</Nav.Link>
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
