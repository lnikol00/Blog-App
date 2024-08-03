import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./create.module.css"
import axios, { AxiosError } from 'axios';
import useAuth from '../../hooks/useAuth';
import useBlog from '../../hooks/useBlog';

function Create() {

    const { handleCreate, errMsg, setErrMsg } = useBlog();
    const form = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [author, setAuthor] = useState<string>("aa")

    const errRef = useRef<null | HTMLParagraphElement>(null)

    useEffect(() => {
        setErrMsg('');
    }, [title, body, author])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleCreate(title, author, body);
        navigate("/");
    };

    useEffect(() => {
        if (titleRef.current)
            titleRef.current.focus()
    }, [])

    const { auth } = useAuth();

    return (
        <div className={styles.mainContainer}>
            <h2>Add a new Blog</h2>
            <p ref={errRef} className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`} aria-live="assertive">
                {errMsg}
            </p>
            <form onSubmit={handleSubmit} ref={form}>
                <label>
                    Blog title:
                </label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} ref={titleRef} />
                <label>
                    Blog body:
                </label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)} />
                <label>
                    Blog author:
                </label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option>{auth?.user}</option>
                </select>
                <button>Add Blog</button>
            </form>
        </div>
    )
}

export default Create
