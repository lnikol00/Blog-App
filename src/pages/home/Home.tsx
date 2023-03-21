import styles from "./home.module.css"
import BlogList from './BlogList'
import useFetch from '../../components/hooks/useFetch'
import useAuth from "../../components/hooks/useAuth"
import { useState } from "react"
import * as BsIcons from "react-icons/bs"

interface ToDoItems {
    id: number,
    title: string
    author: string
    body: string
}

function Home() {
    const { auth } = useAuth();
    const [data, isPending, error] = useFetch<ToDoItems[]>('http://localhost:8000/blogs', []);
    const [search, setSearch] = useState<string>('')
    // To fetch data from database run "npx json-server --watch src/data/db.json --port 8000" in terminal
    return (
        <div className={styles.mainContainer}>
            <div className={styles.heading}>
                <h2>Welcome {auth?.user}</h2>
                <label>
                    <input onChange={e => setSearch(e.target.value)} />
                    <BsIcons.BsSearch />
                </label>
            </div>
            <span>Your blogs are:</span>
            {isPending && <div className={styles.loading}>Loading...</div>}
            {data && <BlogList blogs={data} search={search} />}
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}

export default Home

