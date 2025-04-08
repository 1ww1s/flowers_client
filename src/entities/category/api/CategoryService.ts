import { fetchAuth } from "../../../app/api/fetch"
import { ICategory, IFilterCharacteristic } from "../model/types"




class CategoryService {

    controller: AbortController | null
    constructor(){
        this.controller = null;
    }

    async create(category: ICategory){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/category/create`, {
            method: 'POST',
            body: JSON.stringify(category)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    

    async update(category: ICategory){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/category/update`, {
            method: 'POST',
            body: JSON.stringify(category)
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

    async getAll() {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/category/getAll`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const categories: ICategory[] = await res.json()
        return categories
    }

    async getNames() {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/category/getNames`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const names: {id: number, name: string, slug: string}[] = await res.json()
        return names
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
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/category/getStartsWith`, {
            method: "POST",
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
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/category/get`, {
            method: 'POST',
            body: JSON.stringify({name}),
            signal: this.controller.signal
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const category: ICategory = await res.json()
        this.controller = null;
        return category
    }

    async getFilters(slug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/filter/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const filters: IFilterCharacteristic[] = await res.json()
        return filters
    }

    async getPrices(slug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/prices/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const prices: {min: number, max: number} = await res.json()
        return prices
    }
}

export const categoryService = new CategoryService()