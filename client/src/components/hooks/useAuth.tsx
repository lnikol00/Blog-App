import { useContext } from "react";
import AuthContext from "../../data/context/AuthProvider";
import { ContextType } from '../../data/context/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext) as ContextType
}

export default useAuth