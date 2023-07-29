import React, { useState } from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import SignupLogin from './User/SignupLogin';
import { useNavigate } from 'react-router-dom';

function NavBar({
  isLoggedIn,
  setIsLoggedIn,
  setUserName,
  handleLogout,
  userName,
}) {
  const [show, setShow] = useState(false);
  const [authType, setAuthType] = useState('Log In');

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (authType) => {
    setAuthType(authType);
    setShow(true);
  };

  const renderLoggedIn = () => {
    return (
      <>
        <Navbar expand="lg" className="navbar bg-body-tertiary">
          <Container>
            <Navbar.Brand className="text-start">BookLogue</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button
                  className="mx-2 btn btn-primary"
                  onClick={() => navigate('/me')}
                >
                  All Books
                </Button>
                <Button
                  className="mx-2 btn btn-primary"
                  onClick={() => navigate('/me/books')}
                >
                  My Books
                </Button>
              </Nav>

              <Nav className="me-auto">
                <Navbar.Text className="text-start">
                  Signed in as: {userName}
                </Navbar.Text>
                <Button
                  variant="btn btn-outline-primary"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  };

  const renderLoggedOut = () => {
    return (
      <>
        <Navbar expand="lg" className="navbar bg-body-tertiary">
          <Container>
            <Navbar.Brand className="text-start">BookLogue</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button
                  className="mx-2"
                  variant="btn btn-outline-primary"
                  onClick={() => handleShow('Log In')}
                >
                  Log In
                </Button>

                <Button
                  className="mx-2"
                  variant="btn btn-primary"
                  onClick={() => handleShow('Sign Up')}
                >
                  Signup
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  };

  return (
    <header className="App-header">
      {isLoggedIn ? renderLoggedIn() : renderLoggedOut()}
      <SignupLogin
        show={show}
        handleClose={handleClose}
        authType={authType}
        setIsLoggedIn={setIsLoggedIn}
        setUserName={setUserName}
      />
    </header>
  );
}

export default NavBar;
