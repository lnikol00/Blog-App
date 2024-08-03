import { createContext, useEffect, useState } from "react";
import axios from "../components/api/axios";

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
    handleLogin: (user: string, pwd: string, navigate: Function, from: string) => Promise<void>;
    errMsg: string;
    setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children }: AuthType) => {
    const [auth, setAuth] = useState(() => {
        const storedUserData = JSON.parse(`${localStorage.getItem("userData")}`);

        // If user data exists, use it; otherwise, initialize as null or an empty object
        return storedUserData || null;
    })
    const [persist, setPersist] = useState(JSON.parse(`${localStorage.getItem("persist")}`) || false)
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = async (user: string, pwd: string, navigate: Function, from: string) => {
        try {
            const response = await axios.post("api/users/login",
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            setAuth({ user, accessToken });
            localStorage.setItem("userData", JSON.stringify({ user }));
            navigate(from, { replace: true });
        } catch (error) {
            const err = error as any;
            if (!err?.response) {
                setErrMsg("No server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing username or password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
        }
    };

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, handleLogin, errMsg, setErrMsg }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext