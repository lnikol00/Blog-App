import { createContext, useState } from "react";

interface AuthType {
    children: React.ReactNode
}

export type ContextType = {
    auth: {
        user?: string
        accessToken?: string | number
    }
    setAuth: React.Dispatch<React.SetStateAction<{}>>
    persist: any
    setPersist: React.Dispatch<any>
}

const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: AuthType) => {
    const [auth, setAuth] = useState(() => {
        const storedUserData = JSON.parse(`${localStorage.getItem("userData")}`);

        // If user data exists, use it; otherwise, initialize as null or an empty object
        return storedUserData || null;
    })
    const [persist, setPersist] = useState(JSON.parse(`${localStorage.getItem("persist")}`) || false)

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext