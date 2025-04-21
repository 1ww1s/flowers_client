import { useEffect, useState } from "react";
import { IOrderItem, orderService } from "../../../entities/order"
import { Orders } from "../../../widgets/orders";
import { useAppSelector } from "../../../app/store/store";
import { useSearchParams } from "react-router-dom";


export default function AdminOrderlistShopArchive(){

    const [orders, setOrders] = useState<IOrderItem[]>([])
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams()
  
    const {shop} = useAppSelector(s => s.ShopReducer)

    const getOrders = async () => {
        try{
            setIsLoading(true)
            const data = await orderService.getAllShop(shop.id, false, Number(searchParams.get('page')) || 1)
            // await new Promise(resolve => setTimeout(resolve, 13000))
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
        window.scrollTo({top: 0})
    }, [shop.id, searchParams])
  
    return (
        <Orders
            admin={true}
            numbOrderLoader={2} 
            items={orders} 
            isLoading={isLoading} 
        />
    )
}