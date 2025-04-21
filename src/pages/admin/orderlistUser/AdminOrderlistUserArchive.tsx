import { useEffect, useState } from "react";
import { IOrderItem, orderService } from "../../../entities/order"
import { useAppSelector } from "../../../app/store/store";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Orders } from "../../../widgets/orders";


export default function AdminOrderlistUserArchive(){

    const [orders, setOrders] = useState<IOrderItem[]>([])
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams()
  
    const {searchPhoneSelected} = useOutletContext<{searchPhoneSelected: string}>()

    const getOrders = async () => {
        try{
            setIsLoading(true)
            const data = await orderService.getAllUser(searchPhoneSelected, false, Number(searchParams.get('page')) || 1)
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
    }, [searchPhoneSelected, searchParams])
  
    return (
        <Orders
            admin={true}
            numbOrderLoader={2} 
            items={orders} 
            isLoading={isLoading} 
        />
    )
}