import React, { createContext, useContext } from "react";
import type { AuthContextType, UserInfo } from "../types";

const AuthContext = createContext<AuthContextType>({
    userInfo: null,
    login: (userData: UserInfo) => { },
    logout: () => { }
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider: React.Provider<AuthContextType> = AuthContext.Provider