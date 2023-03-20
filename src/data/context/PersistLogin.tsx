import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import useAuth from '../../components/hooks/useAuth';
import useRefreshToken from '../../components/hooks/useRefreshToken'

function PersistLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading ?
                <p>Loading...</p> :
                <Outlet />}
        </>
    )
}

export default PersistLogin
