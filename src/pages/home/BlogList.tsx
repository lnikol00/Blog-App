import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./home.module.css"

interface BlogProps {
    title: string
    blogs: ToDoItems[],
}

interface ToDoItems {
    id: number,
    title: string,
    author: string,
    body: string,
}

function BlogList(props: BlogProps) {
    const blogs = props.blogs
    const title = props.title
    return (
        <div>
            <h2>{title}</h2>
            <h2></h2>
            {blogs.map((blog) => {
                return (
                    <div className={styles.blogPreview} key={blog.id}>
                        <Link to={`blogs/${blog.id}`}>
                            <h2>{blog.title}</h2>
                            <p>Written by {blog.author}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default BlogList
