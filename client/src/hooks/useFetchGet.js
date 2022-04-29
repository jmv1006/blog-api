import { useState, useEffect } from "react";

const useFetchGet = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchData(url)
    }, [url])

    /*Defining a fetch function (fetchData()) outside of useEffect allows me to re-fetch
    data by calling fetchData() from inside a component*/

    const fetchData = (url) => {
        fetch(url)
        .then(res => {
            if(res.ok) {
                res.json().then(res => {
                    setData(res)
                    setIsLoading(false)
                })
                return
            }
            setIsLoading(false)
            setError(true)
        })
    }

    return { fetchData, data, isLoading, error };
};

export default useFetchGet;