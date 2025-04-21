import { fetchAuth } from "../../../app/api/fetch";
import { IOrderItem, IOrderReq, IOrderRes, IZone, TStatus } from "../model/types";


class OrderService {

    async create(order: IOrderReq){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/order/create`, {
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({order})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const {paymentUrl}: {paymentUrl: string} = await res.json()
        return paymentUrl
    }

    async getAllShop(ShopId: number, active: boolean, page: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/orders`, {
            method: 'POST',
            body: JSON.stringify({ShopId, active, page})
        })
         if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const orders: IOrderItem[] = await res.json()
        return orders
    }

    async getAllUser(phone: string, active: boolean, page: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/user/orders`, {
            method: 'POST',
            body: JSON.stringify({phone, active, page})
        })
         if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const orders: IOrderItem[] = await res.json()
        return orders
    }
    
    async get(id: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/site/order/${id}`)
         if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const order: IOrderRes = await res.json()
        return order
    }

    async getZones(){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/site/zones`)
         if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const zones: IZone[] = await res.json()
        return zones
    }

    async statusChange(id: number, status: TStatus){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/order/status/update`, {
            method: 'POST',
            body: JSON.stringify({id, status})
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }
        
    async getCountShop(ShopId: number, active: boolean){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/orders/count`, {
            method: 'POST',
            body: JSON.stringify({ShopId, active})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {count: number, totalPage: number} = await res.json()
        return data
    }
            
    async getCountUser(phone: string, active: boolean){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/user/orders/count`, {
            method: 'POST',
            body: JSON.stringify({phone, active})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {count: number, totalPage: number} = await res.json()
        return data
    }
}

export const orderService = new OrderService()