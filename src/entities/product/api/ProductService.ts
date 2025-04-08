import { fetchAuth } from "../../../app/api/fetch";
import { IFilters } from "../../../features/selectionFilter/model/types";
import { IProduct, IProductCard, IProductCountShop, IProductPreview } from "../model/types";



class ProductService {

    controller: AbortController | null

    constructor(){
        this.controller = null;
    }

    async create(product: IProduct){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/product/create`, {
            method: 'POST',
            body: JSON.stringify(product)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    

    async update(product: IProduct){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/product/update`, {
            method: 'POST',
            body: JSON.stringify(product)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    

    async delete(id: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/product/delete`, {
            method: 'POST',
            body: JSON.stringify({id})
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    

    async getPreview(slug: string): Promise<IProductPreview> {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/product/preview/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const productPreview: IProductPreview = await res.json()
        return productPreview
    }

    async getByCategory(slug: string, filters: IFilters){
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/products/${slug}`, {
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({filters}),
            signal: this.controller.signal,
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        this.controller = null;
        const data: {products: IProductPreview[], totalPages: number} = await res.json()
        return data
    }

    async getFavourites(ids: number[]){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/favourites`, {
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ids})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: (IProductPreview | null)[] = await res.json()
        return data
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
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/product/getStartsWith`, {
            method: "POST",
            body: JSON.stringify({name}),
            signal: this.controller.signal
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const names: {name: string, slug: string}[] = await res.json()
        this.controller = null;
        return names
    }

    async get(slug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/product/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const product: IProduct = await res.json()
        return product
    }

    async getCard(slug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/productCard/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const product: IProductCard = await res.json()
        return product
    }

    async getPrice(slug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/productPrice/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {price: number, id: number} = await res.json()
        return data
    }

    async getShops(slug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/productShops/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const shops: IProduct['shops'] = await res.json()
        return shops
    }

    async getImages(slug: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/productImages/${slug}`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const images: string[] = await res.json()
        return images
    }

    async getInTheShop(productsId: number[], shopId: number){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/product/shop/getAll`, {
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({productsId, shopId})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const products: IProductCountShop[] = await res.json()
        return products
    }
}

export const productService = new ProductService()