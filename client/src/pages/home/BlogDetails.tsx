import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { BlogType } from './Home';
import * as BsIcons from "react-icons/bs"
import * as BiIcons from "react-icons/bi"
import styles from "./home.module.css"

function BlogDetails() {
    const params = useParams()
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(true)
    const [body, setBody] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')

    const [blog, setBlog] = useState<BlogType>()
    const [error, setError] = useState<null>(null)
    const [isPending, setIsPending] = useState<boolean>(true)
    // To fetch data from database run "npx json-server --watch src/data/db.json --port 8000" in terminal

    useEffect(() => {
        setTitle(`${blog?.title}`)
        setAuthor(`${blog?.author}`)
        setBody(`${blog?.body}`)
    }, [blog?.title, blog?.author, blog?.body])

    useEffect(() => {
        fetch(`http://localhost:8000/blogs/${params.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error('Sorry, we could not fetch the data!')
                }
                return response.json()
            })
            .then((json) => {
                setBlog(json)
                setError(null)
                setIsPending(false)
            })
            .catch((err) => {
                setError(err.message)
                setIsPending(false)
            })

    }, [])
    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${params.id}`, {
            method: 'DELETE',
        }).then(() => {
            navigate("/");
        })
    }

    const handleEdit = () => {
        const blog = { title, author, body }
        fetch(`http://localhost:8000/blogs/${params.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log("blog updated");
            window.location.reload();
        })
        setEdit(!edit)
    }

    const openDropdown = () => {
        setOpen(!open)
    }

    const editBlog = () => {
        setEdit(!edit)
        setOpen(!open)
    }

    return (
        <div className={styles.mainContainer}>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {
                edit ? <>
                    {blog &&
                        <article className={styles.article}>
                            <div className={styles.headingContainer}>
                                <h2>{blog.title}</h2>
                                <div className={styles.dots} onClick={openDropdown}>
                                    <BsIcons.BsThreeDotsVertical />
                                </div>
                            </div>
                            {open ?
                                <div className={styles.dropdown}>
                                    <li className={styles.edit} onClick={editBlog}>
                                        Edit
                                        <BsIcons.BsPencil />
                                    </li>
                                    <li className={styles.delete} onClick={handleDelete}>
                                        Delete
                                        <BiIcons.BiTrash />
                                    </li>
                                </div> :
                                null
                            }
                            <span>Written by {blog.author}</span>
                            <p>{blog.body}</p>
                        </article>
                    }
                </> : <>
                    {blog &&
                        <article className={styles.article}>
                            <div className={styles.headingContainer}>
                                <input
                                    defaultValue={blog.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <select
                                defaultValue={blog.author}
                                onChange={(e) => setAuthor(e.target.value)}
                            >
                                <option value="Luka">Luka</option>
                                <option value="Marta">Marta</option>
                            </select>
                            < div >
                                <textarea defaultValue={blog.body} onChange={(e) => setBody(e.target.value)} />
                                <button onClick={handleEdit}>Save changes</button>
                            </div >
                        </article>
                    }
                </>
            }
        </div>
    )
}

export default BlogDetails