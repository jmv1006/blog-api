import { useEffect, useState } from "react";

const usePost = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsSuccessful(false)
        setIsError(false)
    })

    const postData = (url, body, token, method) => {
        setIsLoading(true)
        fetch(url, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error()
            }
            return res.json()
        })
        .then(res => {
            setIsLoading(false)
            setIsSuccessful(true)
        })
        .catch(error => {
            setIsError(true)
            setIsLoading(false)
        })
    }

    return {isLoading, isSuccessful, isError, postData}
}

export default usePost;