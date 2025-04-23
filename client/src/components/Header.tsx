import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';

const Header = () => {
  return (
    <Navbar as="nav" bg="dark" data-bs-theme="dark" className="border-bottom">
      <Container>
        <Navbar.Brand>Fullstack Todo App</Navbar.Brand>
        <div className="justify-content-end">
          <Button as="a" href="/auth/google">
            Login With Google
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
