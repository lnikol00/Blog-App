import styles from "./home.module.css"
import BlogList from './BlogList'
import useFetch from '../../components/hooks/useFetch'
import useAuth from "../../components/hooks/useAuth"

interface ToDoItems {
    id: number,
    title: string
    author: string
    body: string
}

function Home() {
    const [data, isPending, error] = useFetch<ToDoItems[]>('http://localhost:8000/blogs', []);
    const { auth } = useAuth();
    // To fetch data from database run "npx json-server --watch src/data/db.json --port 8000" in terminal
    return (
        <div className={styles.mainContainer}>
            <h2>Welcome {auth?.user}</h2>
            <span>Your blogs are:</span>
            {isPending && <div className={styles.loading}>Loading...</div>}
            {data && <BlogList blogs={data} />}
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default Home

