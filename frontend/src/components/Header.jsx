import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/">Empresa</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Clientes" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/nuevoCliente">Nuevo</NavDropdown.Item>
                <NavDropdown.Item href="/buscarCliente">
                  Buscar
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ventas" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Cargar Planilla
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Ver Planilla
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing">Productos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
