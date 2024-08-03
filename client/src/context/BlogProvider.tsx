import React, { createContext, useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';

interface BlogType {
    children: React.ReactNode;
}

export type BlogContextType = {
    blog: any;
    blogs: any[];
    fetchBlog: (id: string) => Promise<void>;
    fetchBlogs: () => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    handleEdit: (id: string, title: string, author: string, body: string) => Promise<void>;
    handleCreate: (title: string, author: string, body: string) => Promise<void>;
    errMsg: string;
    setErrMsg: React.Dispatch<React.SetStateAction<string>>;
};

const BlogContext = createContext<BlogContextType | null>(null);

export const BlogProvider = ({ children }: BlogType) => {
    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef<HTMLParagraphElement>(null);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("/api/blogs");
            setBlogs(data);
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) {
                setErrMsg("No server response");
            }
            if (errRef.current) errRef.current.focus();
        }
    };

    const fetchBlog = async (id: string) => {
        try {
            const { data } = await axios.get(`/api/blogs/${id}`);
            setBlog(data);
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 404) {
                setErrMsg("Blog not found");
            }
            if (errRef.current) errRef.current.focus();
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/blogs/${id}`);
            console.log("Blog deleted");
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 404) {
                setErrMsg("Blog not found");
            }
            if (errRef.current) errRef.current.focus();
        }
    };

    const handleEdit = async (id: string, title: string, author: string, body: string) => {
        try {
            const updateBlog = {
                title,
                author,
                body,
            };

            const editBlog = await axios.put(`/api/blogs/${id}`, JSON.stringify(updateBlog), {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            console.log(editBlog.data);
            console.log("Blog Edited");
            window.location.reload();
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) {
                setErrMsg("Server not responding");
            } else if (err.response?.status === 400) {
                setErrMsg("Title, author and body are required!");
            }
            if (errRef.current) errRef.current.focus();
        }
    };


    const handleCreate = async (title: string, author: string, body: string) => {
        try {
            const newBlog = await axios.post(
                '/api/blogs',
                { title, author, body },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                }
            );
            console.log(newBlog.data);
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing title, body or author");
            }
            if (errRef.current) errRef.current.focus();
        }
    };


    return (
        <BlogContext.Provider value={{ blog, blogs, fetchBlog, fetchBlogs, handleDelete, handleEdit, errMsg, setErrMsg, handleCreate }}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;