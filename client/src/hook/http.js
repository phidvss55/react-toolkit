import { useEffect, useState } from "react"
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const BASE_URL = 'http://localhost:4000/api' + url

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL);
        setData(res.data);
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }

    fetchData();
  }, [BASE_URL])

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL);
      setData(res.data);
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }

  return {
    data, loading, error, refetch
  }
}

export default useFetch;