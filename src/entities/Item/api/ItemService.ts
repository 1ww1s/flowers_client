import { fetchAuth } from "../../../app/api/fetch"
import { IItem } from "../model/types"



class ItemService{
    
    controller: null | AbortController

    constructor() {
        this.controller = null
    }

    async getAll() {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/flowers`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const items: IItem[] = await res.json()
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
        const items: IItem[] = await res.json()
        this.controller = null;
        return items
    }

}   


export const itemService = new ItemService()