import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { BlogType } from './Home';
import styles from "./home.module.css"

function BlogDetails() {
    const params = useParams()
    const navigate = useNavigate();
    const [blog, setBlog] = useState<BlogType>()
    const [error, setError] = useState<null>(null)
    const [isPending, setIsPending] = useState<boolean>(true)
    // To fetch data from database run "npx json-server --watch src/data/db.json --port 8000" in terminal

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

    return (
        <div className={styles.mainContainer}>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog &&
                <article className={styles.article}>
                    <h2>{blog.title}</h2>
                    <span>Written by {blog.author}</span>
                    <p>{blog.body}</p>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            }
        </div>
    )
}

export default BlogDetails
