import { useState, useEffect } from "react";

const useFetch = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleFetch = (url) => {
    setIsLoading(true)
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
        return res;
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return { isError, isLoading, response, handleFetch };
};

export default useFetch;
