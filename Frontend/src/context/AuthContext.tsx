import { createContext, useContext } from "react";
import type { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const TodoContextProvider = AuthContext.Provider