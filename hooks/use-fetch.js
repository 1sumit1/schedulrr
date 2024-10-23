import { useState } from "react"

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }
    return{data,loading,error,fetchData};
}

export default useFetch;