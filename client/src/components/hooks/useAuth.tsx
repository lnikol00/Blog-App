import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { ContextType } from '../context/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext) as ContextType
}

export default useAuth