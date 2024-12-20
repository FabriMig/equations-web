import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface UseApiResult<T, P> {
    loading: boolean
    data: Data<T>
    error: ErrorType
    fetch: (param: P) => void
}

interface UseAPiOptions<T, P> {
    onSuccess?: (param: T) => void
    onError?: (param: ErrorType) => void
    autoFetch?: boolean
    params?: P
}

export const useApi = <T, P>(apiCall: (param: P) => Promise<AxiosResponse<T>>, options: UseAPiOptions<T, P>): UseApiResult<T, P> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Data<T>>(null);
    const [error, setError] = useState<ErrorType>(null);

    const fetch = useCallback((param: P) => {
        setLoading(true);

        apiCall(param).then((response) => {
            setData(() => response.data)

            if (options.onSuccess) {
                options?.onSuccess(response.data)
            }

        }).catch((err: AxiosError) => {
            if (err.response) {
                if (err.status === 401) {
                    err.message = "Athentication problem. Login again or try again"
                } else if (err.status === 400) {
                    err.message = "Error in the request. Please try again"
                } else if (err.status === 500) {
                    err.message = "Error procesing the request. Please try again"
                } else {
                    err.message = "Ups... Something went wrong"
                }
            }
            
            if (options.onError) {
                options.onError(err as Error)
            }

            setError(err as Error)
        }).finally(() => {
            setLoading(false)
        })

    }, [apiCall, options])

    useEffect(() => {
        if (options?.autoFetch && options.params) {
            return fetch(options.params);
        }

    }, [fetch, options?.autoFetch, options?.params])


    return { error, data, loading, fetch }
}