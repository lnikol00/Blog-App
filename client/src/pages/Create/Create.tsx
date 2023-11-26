import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./create.module.css"
import axios, { AxiosError } from 'axios';
import useAuth from '../../hooks/useAuth';

function Create() {

    const form = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [author, setAuthor] = useState<string>("Luka")

    const [errMsg, setErrMsg] = useState<string>("")

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newBlog = await axios.post('/api/blogs',
                JSON.stringify({ title, author, body, }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )
            console.log(newBlog.data);
            navigate("/")
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.status === 400) {
                setErrMsg("Missing title, body or author")
            }
        }
    }

    useEffect(() => {
        if (titleRef.current)
            titleRef.current.focus()
    }, [])

    const { auth } = useAuth();

    return (
        <div className={styles.mainContainer}>
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSumbit} ref={form}>
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
