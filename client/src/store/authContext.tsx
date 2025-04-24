import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { fetchUser } from "../api";

export interface User {
  id: string;
  name: string;
  googleId: string;
  photoUrl: string;
}

interface AuthState {
  currentUser: User | null;
}

interface AuthContext extends AuthState {
  setCurrentUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { data: sessionUser } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      return await fetchUser();
    },
  });

  const ctx: AuthContext = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    if (sessionUser) {
      setCurrentUser({...sessionUser, photoUrl: `https://images.weserv.nl/?url=${encodeURIComponent(sessionUser.photoUrl)}`});
    }
  }, [sessionUser]);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
