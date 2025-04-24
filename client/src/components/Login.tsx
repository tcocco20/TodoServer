import Button from "react-bootstrap/Button";
import { useAuthContext } from "../store/useAuthContext";
import { Navigate } from "react-router";

const Login = () => {
  const { currentUser } = useAuthContext();

  if (currentUser) return <Navigate to="/dashboard" />;

  return (
    <section className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="mb-4">Welcome to the Todo App</h1>
      <p className="mb-2">
        Log in to start managing and tracking your todo list!
      </p>
      <Button as="a" href="/auth/google">
        Login With Google
      </Button>
    </section>
  );
};

export default Login;
