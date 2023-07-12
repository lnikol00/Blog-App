import React from 'react'
import { useState } from 'react'
import styles from "./header.module.css"
import useLogout from '../hooks/useLogout'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

function Header() {
    const [open, setOpen] = useState<boolean>(false)
    const logout = useLogout();

    const handleChange = () => {
        setOpen(!open)
    }

    const { auth } = useAuth();

    const signOut = async () => {
        await logout();
    }

    return (
        <div className={styles.headerContainer}>
            <Link to='/' className={styles.heading}>
                The Daily Bugle
            </Link>
            <div className={styles.menuItem} onClick={handleChange}>
                <i className={open ? "fa fa-times" : "fa fa-bars"} ></i>
            </div>
            <div className={open ? `${styles.menuBar} ${styles.menuBarActive}` : `${styles.menuBar}`} onClick={handleChange}>
                <li>
                    <Link to='/' className={styles.menuLinks}>Home</Link>
                </li>
                <li>
                    <Link to='/create' className={styles.menuLinks}>New Blog</Link>
                </li>
                <li>
                    {auth?.accessToken ? <Link to="" className={styles.menuLogout} onClick={signOut}>Logout</Link> :
                        <Link to='login' className={styles.menuLogin}>Log in</Link>}
                </li>
            </div>
        </div>
    )
}

export default Header
