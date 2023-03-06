import { createContext, useState } from "react";

interface AuthType {
    children: React.ReactNode
}

export type ContextType = {
    auth: {}
    setAuth: React.Dispatch<React.SetStateAction<{}>>
}

const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: AuthType) => {
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext