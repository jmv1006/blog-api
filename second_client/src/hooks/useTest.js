import { useState, useEffect } from 'react';

const useTestFetch = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isDone, setIsDone] = useState(false);
    
    useEffect(() => {
        if(isDone) {
            setIsLoading(false)
            setResponse(null)
            setIsError(false)
            setIsDone(false)
        }
    }, [isDone])

    const postData = (url, options) => {
        setIsLoading(true)
        fetch(url, options)
        .then(res => {
            if(!res.ok) {
                throw new Error()
            }
            return res.json()
        })
        .then(res => {
            setResponse(res)
            setIsLoading(false)
            setIsDone(true)
        })
        .catch(error => {
            setIsError(true)
            setIsLoading(false)
            setIsDone(true)
        })
    }

    //const putData = () => {}
    //const deleteData = () => {}
    //const fetchData = () => {}

    return {isLoading, response, isError, postData}
}

export default useTestFetch;