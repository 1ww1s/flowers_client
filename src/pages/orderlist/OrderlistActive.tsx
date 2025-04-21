import { useEffect, useState } from "react";
import { IOrderItem } from "../../entities/order"
import { Orders } from "../../widgets/orders"
import { userService } from "../../entities/user";
import { useSearchParams } from "react-router-dom";


export default function OrderlistActive(){

    const [orders, setOrders] = useState<IOrderItem[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [searchParams, setSearchParams] = useSearchParams()

    const getMyOrders = async () => {
        try{
            setIsLoading(true)
            // await new Promise(resolve => setTimeout(resolve, 24000))
            const data = await userService.getOrders(true, Number(searchParams.get('page')) || 1)
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
    }, [searchParams])

    return (
        <Orders 
            numbOrderLoader={2} 
            items={orders} 
            isLoading={isLoading} 
        />
    )
}