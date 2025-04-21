import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import { ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ORDERLIST_ARCHIVE_ROUTE } from "../../../../app/router/routes";
import { NumbItems } from "../../../../shared";
import { useAppSelector } from "../../../../app/store/store";
import { orderService } from "../../api/OrderService";
import { NavLinks } from "./NavLinks";

interface IProps {
    setTotalPageActive: (count: number) => void;
    setTotalPageArchive: (count: number) => void;
}

export const NavAdmin: FC<IProps> = ({setTotalPageActive, setTotalPageArchive}) => {

    const [numbActive, setNumbActive] = useState<number>(0)
    const [numbArchive, setNumbArchive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {shop} = useAppSelector(s => s.ShopReducer)

    const getCount = async () => {
        try{
            setIsLoading(true)
            const {count: active, totalPage: totalPageActive} = await orderService.getCountShop(shop.id, true)
            const {count: archive, totalPage: totalPageArchive} = await orderService.getCountShop(shop.id, false)
            setNumbActive(active)
            setNumbArchive(archive)
            setTotalPageActive(totalPageActive)
            setTotalPageArchive(totalPageArchive)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(shop.id){
            getCount()
        }       
    }, [shop])

    return (
        <NavLinks
            numbActive={numbActive}
            numbArchive={numbArchive}
            isLoading={isLoading}
            linkActive={ADMIN_ORDERLIST_ACTIVE_ROUTE}
            linkArchive={ADMIN_ORDERLIST_ARCHIVE_ROUTE}
        />
    )
}