import styles from "./home.module.css"
import useAuth from "../../components/hooks/useAuth"
import { useEffect, useState } from "react"
import * as BsIcons from "react-icons/bs"
import { Link } from "react-router-dom"

export type BlogType = {
    id: number,
    title: string
    author: string
    body: string
}

type BlogsType = Array<BlogType>

function Home() {
    const { auth } = useAuth();
    const [search, setSearch] = useState<string>('')
    const [error, setError] = useState<null>(null)
    const [isPending, setIsPending] = useState<boolean>(true)
    const [blogs, setBlogs] = useState<BlogsType>([])
    // To fetch data from database run "npx json-server --watch src/data/db.json --port 8000" in terminal

    useEffect(() => {
        fetch("http://localhost:8000/blogs")
            .then((response) => {
                if (!response.ok) {
                    throw Error('Sorry, we could not fetch the data!')
                }
                return response.json()
            })
            .then((json) => {
                setBlogs(json)
                setError(null)
                setIsPending(false)
            })
            .catch((err) => {
                setError(err.message)
                setIsPending(false)
            })

    }, [])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.heading}>
                {auth?.user ? <h2 >Welcome back {auth?.user}!</h2> : <h2>My Home Page</h2>}
                <label>
                    <input onChange={e => setSearch(e.target.value)} />
                    <BsIcons.BsSearch />
                </label>
            </div>
            <span>Your blogs are:</span>
            {isPending && <div className={styles.loading}>Loading...</div>}
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
                        <div className={styles.blogPreview} key={blog.id}>
                            <Link to={`blogs/${blog.id}`}>
                                <h2>{blog.title}</h2>
                                <p>Written by {blog.author}</p>
                            </Link>
                        </div>
                    )
                })
            }
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default Home

