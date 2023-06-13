import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from '../../data/api/axios'
import { AxiosError } from 'axios'
import styles from "./login.module.css"
import useAuth from '../../components/hooks/useAuth'

const LOGIN_URL = "/auth"

function Login() {
    const { setAuth, persist, setPersist } = useAuth();
    const userRef = useRef<null | HTMLInputElement>(null)
    const errRef = useRef<null | HTMLParagraphElement>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

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
            navigate(from, { replace: true })
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

    const togglePersist = () => {
        setPersist((prev: any) => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])



    return (

        <div className={styles.mainContainer}>
            <p ref={errRef} className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor='username'>
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label>
                    Password:
                </label>
                <input
                    type="password"
                    id="paswword"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign in</button>
                <div className={styles.persistCheck}>
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor='persist'>Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span>
                    <Link to='/register'>Sign Up</Link>
                </span>
            </p>
        </div>
    )
}

export default Login
