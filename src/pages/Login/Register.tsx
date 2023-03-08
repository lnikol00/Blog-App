import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../data/api/axios';
import { AxiosError } from 'axios';
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as IoIcons from "react-icons/io"

import styles from "./login.module.css"

const USER_REGEX = /^[A-Za-z0-9-_]{4,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'

function Register() {
    const userRef = useRef<null | HTMLInputElement>(null)
    const errRef = useRef<null | HTMLParagraphElement>(null)
    const navigate = useNavigate();

    const [user, setUser] = useState<string>('');
    const [validName, setValidName] = useState<boolean>(false);
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [pwd, setPwd] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>('');
    const [validMatch, setValidMatch] = useState<boolean>(false);
    const [matchFocus, setMatchFocus] = useState<boolean>(false);

    const [errMsg, setErrMsg] = useState('')
    // const [success, setSucces] = useState<boolean>(false)

    const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(event.target.value)
    }

    const handleMatchPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatchPwd(event.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const changeRegister = () => {
        navigate("/login")
    }

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // if something fails with button disable
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry')
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data)
            // console.log(response.accessToken)
            console.log(JSON.stringify(response))
            // setSucces(true)
        }
        catch (error) {
            const err = error as AxiosError
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            if (errRef.current)
                errRef.current.focus();
        }
    }

    return (
        <div className={styles.mainContainer} >
            <p ref={errRef} className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username:
                    <span className={validName ? `${styles.valid}` : `${styles.hide}`}>
                        <BsIcons.BsCheck />
                    </span>
                    <span className={validName || !user ? `${styles.hide}` : `${styles.invalid}`}>
                        <IoIcons.IoIosClose />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    value={user}
                    onChange={handleUser}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    required
                />
                <p id="uidnote" className={userFocus && user && !validName ? `${styles.instructions}` : `${styles.offscreen}`}>
                    <AiIcons.AiOutlineInfoCircle />
                    4 to 24 characters<br />
                    Must begin with a letter <br />
                    Letter, numbers, underscores, hypens allowed
                </p>
                <label htmlFor='password'>
                    Password:
                    <span className={validPwd ? `${styles.valid}` : `${styles.hide}`}>
                        <BsIcons.BsCheck />
                    </span>
                    <span className={validPwd || !pwd ? `${styles.hide}` : `${styles.invalid}`}>
                        <IoIcons.IoIosClose />
                    </span>
                </label>
                <input
                    type="password"
                    id="paswword"
                    onChange={handlePassword}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? `${styles.instructions}` : `${styles.offscreen}`}>
                    <AiIcons.AiOutlineInfoCircle />
                    8 to 24 characters<br />
                    Must include upercase and lovercase letters,
                    a number and a special character.<br />
                    Allowed special characters: <span aria-label='exclamation mark'>!</span>
                    <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
                    <span aria-label='dollar-sign'>$</span> <span aria-label='percent'>%</span>
                </p>
                <label htmlFor='confirm_pwd'>
                    Confirm Password:
                    <span className={validMatch && matchPwd ? `${styles.valid}` : `${styles.hide}`}>
                        <BsIcons.BsCheck />
                    </span>
                    <span className={validMatch || !matchPwd ? `${styles.hide}` : `${styles.invalid}`}>
                        <IoIcons.IoIosClose />
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={handleMatchPassword}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && matchPwd && !validMatch ? `${styles.instructions}` : `${styles.offscreen}`}>
                    <AiIcons.AiOutlineInfoCircle />
                    Must match  the first password input field!
                </p>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign up</button>
            </form>
            <p>
                Already registered?<br />
                <span>
                    <a href='' onClick={changeRegister}>Sign In</a>
                </span>
            </p>
        </div >
    )
}

export default Register
