import { fetchAuth } from "../../../app/api/fetch";
import { IOrderItem, IOrderReq, IOrderRes } from "../model/types";


class OrderService {

    async create(order: IOrderReq){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/user/order/create`, {
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
        const {orderId}: {orderId: number} = await res.json()
        return orderId
    }

    async getAllShop(ShopId: number, active: boolean){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/orders`, {
            method: 'POST',
            body: JSON.stringify({ShopId, active})
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
        
    async getCountShop(ShopId: number, active: boolean){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/shop/orders/count`, {
            method: 'POST',
            body: JSON.stringify({ShopId, active})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const data: {count: number} = await res.json()
        return data.count
    }
}

export const orderService = new OrderService()