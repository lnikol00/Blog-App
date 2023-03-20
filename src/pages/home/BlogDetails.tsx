import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch';
import styles from "./home.module.css"

interface ToDoItems {
    id: number,
    title: string
    author: string
    body: string
}

function BlogDetails() {
    const params = useParams()
    // const navigate = useNavigate();
    const [data, isPending, error] = useFetch<ToDoItems[]>(`http://localhost:8000/blogs${params.id}`, [])
    // To fetch data from database run "npx json-server --watch src/data/db.json --port 8000" in terminal


    // const handleClick = () => {
    //     fetch(`http://localhost:8000/blogs`, {
    //         method: 'DELETE',
    //     }).then(() => {
    //         navigate("/");
    //     })
    // }

    return (
        <div className={styles.mainContainer}>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <>
                {data &&
                    <article>
                        {/* <button onClick={handleClick}>Delete</button> */}
                    </article>
                }
            </>
        </div>
    )
}

export default BlogDetails
