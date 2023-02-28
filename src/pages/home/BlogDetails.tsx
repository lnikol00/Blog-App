import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../components/useFetch/useFetch';
import styles from "./home.module.css"

interface ToDoItems {
    id: number,
    title: string
    author: string
    body: string
}

function BlogDetails() {
    const params = useParams()
    const [data, isPending, error] = useFetch<ToDoItems[]>(`http://localhost:8000/blogs${params.id}`, [])

    return (
        <div className={styles.mainContainer}>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </div>
    )
}

export default BlogDetails
