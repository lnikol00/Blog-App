import axios from "../../data/api/axios";
import useAuth from "./useAuth";

import React from 'react'

function useLogout() {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err)
        }
    }

    return logout;
}

export default useLogout
