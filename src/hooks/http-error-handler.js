import { useState, useEffect } from 'react'

export default httpClient => {
    const [error, seterror] = useState(null)

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        seterror(null)
        return req
    })
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        seterror(err)
    })


    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor)
            httpClient.interceptors.response.eject(resInterceptor)
        }
    }, [reqInterceptor, resInterceptor])

    const errorConfirmedHandler = () => {
        seterror(null)
    }

    return [error, errorConfirmedHandler]
} 