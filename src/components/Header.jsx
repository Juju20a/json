import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <header>
      <Navbar expand="lg" bg="light" variant="light" expanded={expanded}>
        <Container fluid>
          <Navbar.Brand href="/">Educa Brasil</Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
              <Nav.Link href="/propriedades" onClick={() => setExpanded(false)}>Instituições de Ensino</Nav.Link>
              <Nav.Link href="/sobre" onClick={() => setExpanded(false)}>Sobre</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
