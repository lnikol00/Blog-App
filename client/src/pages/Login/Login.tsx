import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from "./login.module.css"
import useAuth from '../../hooks/useAuth'

function Login() {
    const { handleLogin, persist, setPersist, errMsg, setErrMsg } = useAuth();
    const userRef = useRef<null | HTMLInputElement>(null)
    const errRef = useRef<null | HTMLParagraphElement>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin(user, pwd, navigate, from);
    };

    const togglePersist = () => {
        setPersist((prev: any) => !prev);
    }

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
