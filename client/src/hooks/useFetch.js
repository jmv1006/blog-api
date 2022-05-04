import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    handleFetch(url);
  }, [url]);

  const handleFetch = (url) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        setResponse(res);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return { isError, isLoading, response, handleFetch };
};

export default useFetch;
