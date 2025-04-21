import { fetchAuth } from "../../../app/api/fetch"
import { IItem } from "../model/types"



class ItemService{
    
    controller: null | AbortController

    constructor() {
        this.controller = null
    }

    async create(item: IItem){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/item/create`, {
            method: 'POST',
            body: JSON.stringify(item)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
        
    async update(item: IItem){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/item/update`, {
            method: 'POST',
            body: JSON.stringify(item)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
        
    async delete(id: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/item/delete`, {
            method: 'POST',
            body: JSON.stringify({id})
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    

    async getAllByCategory<T>(slug: string) {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/flowers/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const items: T = await res.json()
        return items
    }

    async getStartsWith(name: string){
        if(!name.length){
            if(this.controller)
                this.controller.abort()
            return []
        }   
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/flower/getStartsWith`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name}),
            signal: this.controller.signal
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const names: string[] = await res.json()
        this.controller = null;
        return names
    }

    async get(name: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/flower/get`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name}),
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const item: IItem = await res.json()
        return item
    }

}   


export const itemService = new ItemService()