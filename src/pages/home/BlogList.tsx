import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "./home.module.css"

interface BlogProps {
    blogs: ToDoItems[],
    search: string
}

interface ToDoItems {
    id: number,
    title: string,
    author: string,
    body: string,
}

function BlogList(props: BlogProps) {
    const blogs = props.blogs
    const search = props.search
    return (
        <div className={styles.blogContainer}>
            {blogs.filter((blog) => {
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
            })}
        </div>
    )
}

export default BlogList
