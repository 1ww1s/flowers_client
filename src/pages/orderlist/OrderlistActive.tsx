import { useEffect, useState } from "react";
import { IOrderItem } from "../../entities/order"
import { Orders } from "../../widgets/orders"
import { userService } from "../../entities/user";


export default function OrderlistActive(){

    const [orders, setOrders] = useState<IOrderItem[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getMyOrders = async () => {
        try{
            setIsLoading(true)
            const data = await userService.getOrders(true)
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
        getMyOrders()
    }, [])

    return (
        <Orders 
            numbOrderLoader={2} 
            items={orders} 
            isLoading={isLoading} 
        />
    )
}