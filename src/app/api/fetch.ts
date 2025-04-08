import { IUser } from "../../entities/user"
import { AuthError } from "../../shared";



export const fetchWithConditions = async() => async (url: string, init?: RequestInit): Promise<Response> => {
    const newInit: RequestInit = {...init};
    newInit.headers = {
        ...newInit.headers,
        'Content-Type': 'application/json;charset=utf-8',
    } 
    newInit.credentials = 'same-origin'
    const res = await fetch(url, newInit)
    return res
}

export const fetchAuth = async (url: string, init?: RequestInit, isRetry?: boolean): Promise<Response> => {
    const newInit: RequestInit = {...init};

    newInit.headers = {
        ...newInit.headers,
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    newInit.credentials = 'same-origin'
    const res = await fetch(url, newInit)
    
    const authError = async (res: Response) => {
        const {message}: {message: string} = await res.json()
        throw new AuthError(message)
    }

    if(!res.ok) {
        if((res.status === 401 || res.status === 403)){
            if(!isRetry){
                const newToken = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/user/refresh`, {
                    credentials: 'include'
                })
                if(!newToken.ok) await authError(newToken)
                const res: {user: IUser, accessToken: string} = await newToken.json()
                localStorage.setItem('token', res.accessToken)
                return await fetchAuth(url, init, true)
            }
            else{
                await authError(res)
            }
        }
    }
    return res
}
