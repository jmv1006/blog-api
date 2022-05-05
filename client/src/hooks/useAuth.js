import { useState, useEffect } from "react";

const useAuth = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [returnedUser, setReturnedUser] = useState(null);
    const [isDone, setIsDone] = useState(false);

    const signIn = (body) => {
        setIsLoading(true)
        fetch("/auth/sign-in", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        })
        .then(res => {
            if(!res.ok) {
                setError(res)
                throw new Error()
            }
            return res.json()
            })
        .then(res => {
            setIsLoading(false)
            setReturnedUser({
                user: res.user,
                token: res.token
            })
        })
        .catch(error => {
            setIsLoading(false)
        })
    };

    const signUp = (body) => {
        setIsLoading(true)
        fetch("/auth/sign-up", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        })
        .then(res => {
            if(!res.ok) {
                setError(res)
                throw new Error()
            }
            return res.json()
            })
        .then(res => {
            //succesful
            setIsDone(true)
        })
        .catch(error => {
            setIsDone(true)
        })
    }

    return { isLoading, error, returnedUser, signIn, signUp, isDone }
};

export default useAuth;
