import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import * as BsIcons from "react-icons/bs"
import * as BiIcons from "react-icons/bi"
import styles from "./home.module.css"
import useAuth from '../../hooks/useAuth';
import useBlog from '../../hooks/useBlog';

function BlogDetails() {
    const { auth } = useAuth();
    const { fetchBlog, handleDelete, handleEdit, blog, errMsg, setErrMsg } = useBlog();
    const params = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(true)
    const [body, setBody] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
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
        if (params.id) {
            fetchBlog(params.id);
        }
    }, [params.id]);

    const handleBlogEdit = async () => {
        if (params.id) {
            await handleEdit(params.id, title, author, body);
            setEdit(!edit);
        }
    };

    const handleBlogDelete = async () => {
        if (params.id) {
            await handleDelete(params.id);
            navigate("/");
        }
    };

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
                                    (blog.author === auth.user) ?
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
                                    <li className={styles.delete} onClick={handleBlogDelete}>
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
                            <button onClick={handleBlogEdit}>Save changes</button>
                        </article>
                    }
                </>
            }
        </div >
    )
}

export default BlogDetails