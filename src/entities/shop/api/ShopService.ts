import { fetchAuth } from "../../../app/api/fetch"
import { IShop } from "../model/types";




class ShopService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async create(shop: IShop){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/create`, {
            method: 'POST',
            body: JSON.stringify(shop)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
    
    async update(shop: IShop){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/update`, {
            method: 'POST',
            body: JSON.stringify(shop)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
    
    async delete(id: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/category/delete`, {
            method: 'POST',
            body: JSON.stringify({id})
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    

    async getStartsWith(title: string){
        if(!title.length){
            if(this.controller)
                this.controller.abort()
            return []
        }   
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/getStartsWith`, {
            method: "POST",
            body: JSON.stringify({title}),
            signal: this.controller.signal
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const names: {title: string, slug: string}[] = await res.json()
        this.controller = null;
        return names
    }

    async get(titleSlug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/shop/${titleSlug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const shop: IShop = await res.json()
        return shop
    }

    async getAll() {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/shops`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const shops: IShop[] = await res.json()
        return shops
    }
    
    async getOptions() {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/getOptions`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const options: {id: number, title: string}[] = await res.json()
        return options
    }
}

export const shopService = new ShopService()