import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../store/useAuthContext";
import UserButton from "./UserButton";

const Header = () => {
  const { currentUser } = useAuthContext();

  return (
    <Navbar as="nav" bg="dark" data-bs-theme="dark" className="border-bottom">
      <Container>
        <Navbar.Brand>Fullstack Todo App</Navbar.Brand>
        <div className="justify-content-end">
          {currentUser ? (
            <UserButton user={currentUser} />
          ) : (
            <Button as="a" href="/auth/google">
              Login With Google
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
