import { useState } from "react";
 function useFetch<T>(fetchFunction: () => Promise<T>, autoFetch = true) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
}