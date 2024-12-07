import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button } from 'react-bootstrap';
import './TopNav.css';

function TopNav() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (event, targetId) => {
    event.preventDefault(); // Prevent default anchor behavior
    handleClose(); // Close the Offcanvas first

    // Use a small delay to allow the Offcanvas to close fully before scrolling
    setTimeout(() => {
      const targetElement = document.getElementById(targetId); // Get the target element
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element
      }
    }, 300); // Adjust the delay as needed (300ms is usually a good starting point)
  };

  return (
    <>
      <Navbar className="custom-navbar" expand="md">
        <Navbar.Brand href="/" className="navbar-brand-custom">Zakat Calculator</Navbar.Brand>
        <Nav className="d-none d-md-flex navbar-nav">
          <Nav.Link href="#calculate" onClick={(e) => handleClick(e, 'calculate')}>Calculate</Nav.Link>
          <Nav.Link href="#references" onClick={(e) => handleClick(e, 'references')}>References</Nav.Link>
          <Nav.Link href="#faq" onClick={(e) => handleClick(e, 'faq')}>FAQ</Nav.Link>
        </Nav>
        <Button 
          variant="outline-dark" 
          className="d-md-none ms-auto custom-toggler" 
          onClick={handleShow}
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
      </Navbar>

      <Offcanvas className="offcanvas-style" show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#calculate" onClick={(e) => handleClick(e, 'calculate')}>Calculate</Nav.Link>
            <Nav.Link href="#references" onClick={(e) => handleClick(e, 'references')}>References</Nav.Link>
            <Nav.Link href="#faq" onClick={(e) => handleClick(e, 'faq')}>FAQ</Nav.Link>
            <Nav.Link href="#faq" onClick={(e) => handleClick(e, 'footer')}>Disclaimer</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TopNav;
