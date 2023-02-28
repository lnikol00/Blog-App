import React from 'react'
import { useState } from 'react'
import styles from "./header.module.css"
import { HeaderData } from './HeaderData'


export interface HeaderProps {
    open: boolean
    handleChange: () => void
}

function Header() {
    const [open, setOpen] = useState<boolean>(false)

    const handleChange = () => {
        setOpen(!open)
    }

    return (
        <div className={styles.headerContainer}>
            <h1>The Daily Bugle</h1>
            <div className={styles.menuItem} onClick={handleChange}>
                <i className={open ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <div className={open ? `${styles.menuBar} ${styles.menuBarActive}` : `${styles.menuBar}`} onClick={handleChange}>
                {HeaderData.map((item, index) => {
                    return (
                        <li key={index}>
                            <a href={item.url} className={styles.menuLinks} >
                                <span>{item.icon}</span>
                                {item.name}
                            </a>
                        </li>
                    )
                })}
                {/* <a>Login</a> */}
            </div>
        </div>
    )
}

export default Header
