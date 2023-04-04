import React, { useEffect, useState } from 'react'

function useFetch<T>(url: string, initialState: T) {
    const [error, setError] = useState<null>(null)
    const [isPending, setIsPending] = useState<boolean>(true)
    const [blogs, setBlogs] = useState<T>(initialState)
    useEffect(() => {
        fetch(url)
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

    }, [url])

    return { blogs, error, isPending }
}

export default useFetch
