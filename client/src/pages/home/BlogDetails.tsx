import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { BlogType } from './Home';
import * as BsIcons from "react-icons/bs"
import * as BiIcons from "react-icons/bi"
import styles from "./home.module.css"
import axios, { AxiosError } from 'axios';
import useAuth from '../../hooks/useAuth';

function BlogDetails() {
    const { auth } = useAuth();
    const params = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(true)
    const [body, setBody] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [blog, setBlog] = useState<BlogType>()

    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef<null | HTMLParagraphElement>(null)

    useEffect(() => {
        setErrMsg('');
    }, [blog, title, author, body])

    useEffect(() => {
        setTitle(`${blog?.title}`)
        setAuthor(`${blog?.author}`)
        setBody(`${blog?.body}`)
    }, [blog?.title, blog?.author, blog?.body])

    useEffect(() => {
        const fetchblogs = async () => {
            try {
                const { data } = await axios.get(`/api/blogs/${params.id}`)
                setBlog(data);
            }
            catch (error) {
                const err = error as AxiosError
                if (!err.response) {
                    setErrMsg("No server response")
                }
                else if (err.response?.status === 404) {
                    setErrMsg("Blog not found")
                }
                if (errRef.current)
                    errRef.current.focus();
            }
        }
        fetchblogs();
    }, [params])

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/blogs/${params.id}`)
            console.log("Blog deleted")
            navigate("/")
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.status === 404) {
                setErrMsg("Blog not found")
            }
            if (errRef.current)
                errRef.current.focus();
        }
    }

    const handleEdit = async () => {
        try {

            const updateBlog = {
                title: title,
                author: author,
                body: body
            }

            const editBlog = await axios.put(`/api/blogs/${params.id}`, JSON.stringify(updateBlog), {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            console.log(editBlog.data);
            console.log("Blog Edited");
            window.location.reload();
        } catch (error) {
            const err = error as AxiosError
            if (!err.response) {
                setErrMsg("Server not responding")
            }
            else if (err.response?.status === 400) {
                setErrMsg("Title, author and body are required!")
            }
            if (errRef.current)
                errRef.current.focus();
        }
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
            <p ref={errRef} className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`} aria-live="assertive">
                {errMsg}
            </p>
            {
                edit ? <>
                    {blog &&
                        <article className={styles.article}>
                            <div className={styles.headingContainer}>
                                <h2>{blog.title}</h2>
                                {
                                    (blog.author !== auth.user) ?
                                        <div className={styles.dots} onClick={openDropdown}>
                                            <BsIcons.BsThreeDotsVertical />
                                        </div> :
                                        null
                                }
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
                            </div >
                            <button onClick={handleEdit}>Save changes</button>
                        </article>
                    }
                </>
            }
        </div >
    )
}

export default BlogDetails