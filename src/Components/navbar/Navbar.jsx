import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Button from "react-bootstrap/Button";

function Mynavbar() {
  const firebase = useFirebase();

  async function handlelogOut() {
    if (firebase.isLoggedin) {
      await firebase.logout();
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">Bookify</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {firebase.isLoggedin ? (
              <>
                <Link to="/" onClick={handlelogOut} className="px-4">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/loginpage">Login</Link>
              </>
            )}

            <Link to="/signinpage" className="px-4">
              Register
            </Link>

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Mynavbar;
