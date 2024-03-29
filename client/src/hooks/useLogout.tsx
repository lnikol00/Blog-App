import axios from "../components/api/axios";
import useAuth from "./useAuth";

function useLogout() {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('api/users/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err)
        }
    }

    return logout;
}

export default useLogout
