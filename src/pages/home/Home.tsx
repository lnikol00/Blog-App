import styles from "./home.module.css"
import BlogList from './BlogList'
import { Link } from 'react-router-dom'
import useFetch from '../../components/useFetch/useFetch'

interface ToDoItems {
    id: number,
    title: string
    author: string
    body: string
}

function Home() {
    const [data, isPending, error] = useFetch<ToDoItems[]>('http://localhost:8000/blogs', []);
    return (
        <div className={styles.mainContainer}>
            {isPending && <div className={styles.loading}>Loading...</div>}
            {data && <BlogList blogs={data} title="All Blogs!" />}
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default Home
