import { useState, useEffect } from "react";

const useFetchPost = () => {
  const [postIsLoading, setIsLoading] = useState(null);
  const [postError, setError] = useState(false);
  const [returnedData, setData] = useState(null)

  const clean = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
  };

  const postData = (url, body, token) => {
    setIsLoading(true)
    fetch(url, {
      method: "POST",
      headers: {
        ...(token) && {'Authorization': "Bearer " + token},
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        //succesfully posted, error is false
        setIsLoading(false);
        setError(false)
        res.json().then(res => setData(res))
        clean();
        return;
      }
      //Did not successfully post, error is true
      setError(true);
      res.json().then(res => setData(res))
      clean();
      return
    });
  };

  //returnedData if any data is returned (such as JWTs and user info)
  //postData is a function to actually post data
  //post is loading tells my components if the post is loading
  //post error is a boolean that allows me to determine whether or not a request was successful
  
  return  { returnedData, postData, postIsLoading, postError };
};

export default useFetchPost;
