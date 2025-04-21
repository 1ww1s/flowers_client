import { fetchAuth } from "../../../app/api/fetch"
import { IOrderItem } from "../../order";
import { IUser } from "../model/types"



class UserService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async login(phone: string, password: string): Promise<IUser> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include',
            body: JSON.stringify({phone, password})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {user: IUser, accessToken: string} = await res.json()
        localStorage.setItem('token', data.accessToken)
        return data.user
    }   

    async logout() {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/logout`)
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        localStorage.removeItem('token')
        return message
    }

    async registration(name: string, phone: string, password: string): Promise<IUser> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/user/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name, phone, password})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {user: IUser, accessToken: string} = await res.json()
        localStorage.setItem('token', data.accessToken)
        return data.user
    }

    async check() {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/check`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {user: IUser} = await res.json()
        return data.user
    }

    async getCountOrders(active: boolean) {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/orders/count`, {
            method: "POST",
            body: JSON.stringify({active}),
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {count: number, totalPage: number} = await res.json()
        return data
    }

    
    async getOrders(active: boolean, page: number) {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/orders`, {
            method: "POST",
            body: JSON.stringify({active, page}),
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const orders: IOrderItem[] = await res.json()
        return orders
    }

    async getStartsWith(phone: string){
        if(!phone.length){
            if(this.controller)
                this.controller.abort()
            return []
        }   
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/user/getStartsWith`, {
            method: "POST",
            body: JSON.stringify({phone}),
            signal: this.controller.signal
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const users: {name: string, phone: string}[] = await res.json()
        this.controller = null;
        return users
    }

    

    async get(phone: string){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/user/get`, {
            method: "POST",
            body: JSON.stringify({phone})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const user: {name: string, phone: string, roles: string[]} = await res.json()
        return user
    }

    async rolesUpdate(phone: string, roles: string[]){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/user/rolesUpdate`, {
            method: "POST",
            body: JSON.stringify({phone, roles})
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }

}

export const userService = new UserService()