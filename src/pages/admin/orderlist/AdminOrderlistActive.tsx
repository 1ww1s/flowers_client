import { useEffect, useState } from "react";
import { IOrderItem, orderService } from "../../../entities/order"
import { Orders } from "../../../widgets/orders"
import { useAppSelector } from "../../../app/store/store";


export default function AdminOrderlistActive(){

    const [orders, setOrders] = useState<IOrderItem[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {shop} = useAppSelector(s => s.ShopReducer)

    const getOrders = async () => {
        try{
            setIsLoading(true)
            const data = await orderService.getAllShop(shop.id, true)
            setOrders(data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getOrders()
    }, [shop.id])

    return (
        <Orders 
            admin={true}
            numbOrderLoader={2} 
            items={orders} 
            isLoading={isLoading} 
        />
    )
}