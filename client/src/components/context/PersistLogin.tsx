import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken'

function PersistLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist ?
                <Outlet /> :
                isLoading ?
                    <p style={{ margin: '2rem 10rem' }}>Loading...</p> :
                    <Outlet />
            }
        </>
    )
}

export default PersistLogin
