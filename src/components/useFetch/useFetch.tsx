import { useEffect, useState } from 'react'

function useFetch<T>(url: string, initialState: T): [T, boolean, null] {
    const [data, setData] = useState<T>(initialState)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    // To fetch data from database run "npx json-server --watch src/data/db.json --port 8000" in terminal
    useEffect(() => {
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
    }, [url])
    return [data, isPending, error]
}

export default useFetch