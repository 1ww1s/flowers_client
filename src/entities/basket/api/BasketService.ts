import { fetchAuth } from "../../../app/api/fetch";
import { IBasket, IInfoAboutProduct } from "../model/types";




class BasketService {

    async getItems(ids: number[]){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/product/basket`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ids})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const items: ((IBasket & {countMax: number}) | null)[] = await res.json()
        return items
    }

    async basketGet(){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/basket/get`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const basket: IInfoAboutProduct[] = await res.json()
        return basket
    }

    async basketAdd(item: {id: number, count: number}){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/basket/add`, {
            method: "POST",
            body: JSON.stringify({item})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data = await res.json()
        return data
    }

    async countUpdate(productId: number, count: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/basket/count/update`, {
            method: "POST",
            body: JSON.stringify({productId, count})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const message = await res.json()
        return message
    }

    async basketAddItems(basket: {id: number, count: number}[]){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/basket/add/items`, {
            method: "POST",
            body: JSON.stringify({basket})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: number[] = await res.json()
        return data
    }

    async basketDelete(ProductId: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/user/basket/delete`, {
            method: "POST",
            body: JSON.stringify({ProductId})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data = await res.json()
        return data
    }

}

export const basketService = new BasketService()