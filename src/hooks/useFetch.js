import { useEffect, useState } from "react";
import api from "api/axios";

const useFetch = (endpoint, params, page) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (signal) => {
    setIsLoading(true);
    try {
      const res = await api.get(endpoint, { params, signal });
      if (res.data.code === 0) {
        setData(res.data.result);
        setTotalCount(res.data?.totalCount);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => controller.abort();
  }, [page]);

  return { isLoading, data, fetchData, isError, totalCount };
};

export default useFetch;
