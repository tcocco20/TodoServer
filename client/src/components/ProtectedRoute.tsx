import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "../store/useAuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useAuthContext();

  if (currentUser === null) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
