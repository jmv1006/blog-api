import { useEffect, useState } from "react";

const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      setError(null);
    }
  }, [isSuccessful]);

  const postData = (url, token, body) => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          setError(res);
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        setIsSuccessful(true);
      })
      .catch((error) => {});
  };

  return { postData, isLoading, error, isSuccessful };
};

export default usePost;
