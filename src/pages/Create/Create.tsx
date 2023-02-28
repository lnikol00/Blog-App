import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./create.module.css"

function Create() {

    const form = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("Luka")

    const handletitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const handlebody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value)
    }
    const handleauthor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthor(event.target.value)
    }

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const blog = { title, author, body }

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("new blog added");
        })
        navigate("/")
        // form.current.reset();
    }

    return (
        <div className={styles.mainContainer}>
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSumbit} ref={form}>
                <label>
                    Blog title:
                </label>
                <input type="text" required value={title} onChange={handletitle} />
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
                <button>Add Blog</button>
            </form>
        </div>
    )
}

export default Create
