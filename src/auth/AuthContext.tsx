import { createContext } from "react";
import { AuthState } from "./AuthReducer";

export type AuthContextType = {
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
  login: AuthState;
  loggedInState: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
