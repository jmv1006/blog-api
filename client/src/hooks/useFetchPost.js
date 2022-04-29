import { useState, useEffect } from "react";

const useFetchPost = (url, body, token) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false)

    fetch(url, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if(res.ok) {
            //succesfully posted
            res.json().then(res => {
              setIsLoading(false)
              setData(res)
            })
            return
        }
        setIsLoading(false)
        setError(true)
      });   

    return data;
};

export default useFetchPost;