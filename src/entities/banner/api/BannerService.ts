import { fetchAuth } from "../../../app/api/fetch";
import { IBanner } from "../model/types";


class BannerService {

    controller: AbortController | null
        constructor(){
            this.controller = null;
        }
    
    async create(banner: IBanner){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/banner/create`, {
            method: 'POST',
            body: JSON.stringify(banner)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
    
    async update(banner: IBanner){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/banner/update`, {
            method: 'POST',
            body: JSON.stringify(banner)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
    
    async delete(id: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/banner/delete`, {
            method: 'POST',
            body: JSON.stringify({id})
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
    
    async getAll() {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/banner/getAll`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const categories: IBanner[] = await res.json()
        return categories
    }

    async get(title: string) {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/banner/get`, {
            method: 'POST',
            body: JSON.stringify({title}),
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const banner: IBanner = await res.json()
        return banner
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
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/banner/getStartsWith`, {
            method: "POST",
            body: JSON.stringify({title}),
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

}

export const bannerService = new BannerService()