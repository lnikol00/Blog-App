import { useEffect, useState } from 'react'

function useFetch<ToDoItems>(url: string, initialState: ToDoItems) {
    const [data, setData] = useState<ToDoItems>(initialState)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Sorry, we could not fetch the data!')
                    }
                    return res.json()
                })
                .then(data => {
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    setIsPending(false)
                    setError(err.message)
                })
        }, 1000)

    }, [url])
    return { data, isPending, error }
}

export default useFetch