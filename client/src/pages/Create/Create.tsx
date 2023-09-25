import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./create.module.css"
import axios from 'axios';

function Create() {

    const form = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [author, setAuthor] = useState<string>("Luka")
    const [disabled, setDisabled] = useState<boolean>(true)

    const handletitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
        setTitle(event.target.value)
    }
    const handlebody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value === "") {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
        setBody(event.target.value)
    }
    const handleauthor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthor(event.target.value)
    }

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newBlog = {
            title: title,
            author: author,
            body: body,
        }
        axios.post('/api/blogs', JSON.stringify(newBlog), {
            headers: {
                "Content-Type": "application/json"
            },
        }
        ).then(() => {
            console.log("new blog added")
        })
        navigate("/")
    }

    useEffect(() => {
        if (titleRef.current)
            titleRef.current.focus()
    }, [])

    return (
        <div className={styles.mainContainer}>
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSumbit} ref={form}>
                <label>
                    Blog title:
                </label>
                <input type="text" required value={title} onChange={handletitle} ref={titleRef} />
                <label>
                    Blog body:
                </label>
                <textarea required value={body} onChange={handlebody} />
                <label>
                    Blog author:
                </label>
                <select
                    value={author}
                    onChange={handleauthor}
                >
                    <option value="Luka">Luka</option>
                    <option value="Marta">Marta</option>
                </select>
                <button disabled={disabled}>Add Blog</button>
            </form>
        </div>
    )
}

export default Create
