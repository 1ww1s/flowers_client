import { useEffect, useState } from "react";
import { IOrderItem, orderService } from "../../../entities/order"
import { Orders } from "../../../widgets/orders"
import { useAppSelector } from "../../../app/store/store";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";


export default function AdminOrderlistUserActive(){

    const [orders, setOrders] = useState<IOrderItem[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {searchPhoneSelected} = useOutletContext<{searchPhoneSelected: string}>()

    const [searchParams, setSearchParams] = useSearchParams()
 
    const getOrders = async () => {
        try{
            setIsLoading(true)
            const data = await orderService.getAllUser(searchPhoneSelected, true, Number(searchParams.get('page')) || 1)
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