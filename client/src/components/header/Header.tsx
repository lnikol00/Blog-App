import React from 'react'
import { useState } from 'react'
import styles from "./header.module.css"
import useLogout from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

function Header() {
    const [open, setOpen] = useState<boolean>(false)
    const [menu_class, setMenuClass] = useState(`${styles.menuBars} ${styles.unclicked}`)
    const logout = useLogout();

    const handleChange = () => {
        if (!open) {
            setMenuClass(`${styles.menuBars} ${styles.clicked}`)
        }
        else {
            setMenuClass(`${styles.menuBars} ${styles.unclicked}`)
        }
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
                <div className={menu_class}></div>
                <div className={menu_class}></div>
                <div className={menu_class}></div>
            </div>
            <div className={open ? `${styles.menuBar} ${styles.menuBarActive}` : `${styles.menuBar}`} onClick={handleChange}>
                <li>
                    <Link to='/' className={styles.menuLinks}>Home</Link>
                </li>
                <li>
                    <Link to='/create' className={styles.menuLinks}>New Blog</Link>
                </li>
                <li>
                    {auth?.accessToken ? <Link to="" className={`${styles.menuLogout} ${styles.menuLinks}`} onClick={signOut}>Logout</Link> :
                        <Link to='login' className={`${styles.menuLogin} ${styles.menuLinks}`}>Log in</Link>}
                </li>
            </div>
        </div>
    )
}

export default Header
