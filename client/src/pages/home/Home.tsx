import styles from "./home.module.css"
import useAuth from "../../hooks/useAuth"
import { useEffect, useRef, useState } from "react"
import * as BsIcons from "react-icons/bs"
import { Link } from "react-router-dom"
import axios from "../../components/api/axios"
import { AxiosError } from "axios"

export type BlogType = {
    _id: number | string,
    title: string
    author: string
    body: string
}

type BlogsType = Array<BlogType>

function Home() {
    const { auth } = useAuth();
    const [search, setSearch] = useState<string>('')
    const [blogs, setBlogs] = useState<BlogsType>([])

    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef<null | HTMLParagraphElement>(null)

    useEffect(() => {
        setErrMsg('');
    }, [blogs])

    useEffect(() => {
        const fetchblogs = async () => {
            try {
                const { data } = await axios.get("/api/blogs")
                setBlogs(data);
            } catch (error) {
                const err = error as AxiosError
                if (!err.response) {
                    setErrMsg("No server response");
                }
                if (errRef.current)
                    errRef.current.focus();
            }
        }
        fetchblogs();

    }, [])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.heading}>
                <h2 >Welcome back {auth.user}!</h2>
                <label>
                    <input onChange={e => setSearch(e.target.value)} />
                    <BsIcons.BsSearch />
                </label>
            </div>
            <span>Your blogs are:</span>
            <p ref={errRef} className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`} aria-live="assertive">
                {errMsg}
            </p>
            {blogs &&
                blogs.filter((blog) => {
                    if (search === "") {
                        return blog;
                    }
                    else if (blog.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                        return blog;
                    }
                    else if (blog.author.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                        return blog;
                    }

                }).map((blog) => {
                    return (
                        <div className={styles.blogPreview} key={blog._id}>
                            <Link to={`/blogs/${blog._id}`}>
                                <h2>{blog.title}</h2>
                                <p>Written by {blog.author}</p>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home

