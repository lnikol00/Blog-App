import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../data/api/axios'
import { AxiosError } from 'axios'
import AuthContext from '../../data/context/AuthProvider'
import { ContextType } from '../../data/context/AuthProvider'
import styles from "./login.module.css"

const LOGIN_URL = "/auth"

function Login() {
    const { setAuth } = useContext(AuthContext) as ContextType
    const userRef = useRef<null | HTMLInputElement>(null)
    const errRef = useRef<null | HTMLParagraphElement>(null)
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSucces] = useState<boolean>(false)

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken })
        } catch (error) {
            const err = error as AxiosError
            if (!err?.response) {
                setErrMsg("No server Response")
            }
            else if (err.response?.status === 400) {
                setErrMsg("Missing username or password")
            }
            else if (err.response?.status === 401) {
                setErrMsg("Unauthorized")
            }
            else {
                setErrMsg("Login Failed")
            }
            if (errRef.current)
                errRef.current.focus();
        }
    }

    const changeLogin = () => {
        navigate("/register")
    }

    return (
        <div className={styles.mainContainer}>
            <p ref={errRef} className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={handleUser}
                    value={user}
                    required
                />
                <label>
                    Password:
                </label>
                <input
                    type="password"
                    id="paswword"
                    onChange={handlePassword}
                    value={pwd}
                    required
                />
                <button>Sign in</button>
            </form>
            <p>
                Need an Account?<br />
                <span>
                    <a href='' onClick={changeLogin}>Sign Up</a>
                </span>
            </p>
        </div>
    )
}

export default Login
