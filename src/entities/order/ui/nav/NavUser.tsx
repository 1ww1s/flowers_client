import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import { ADMIN_ORDERLIST_USER_ACTIVE_ROUTE, ADMIN_ORDERLIST_USER_ARCHIVE_ROUTE } from "../../../../app/router/routes";
import { NumbItems } from "../../../../shared";
import { orderService } from "../../api/OrderService";
import { NavLinks } from "./NavLinks";

interface IProps {
    setTotalPageActive: (count: number) => void;
    setTotalPageArchive: (count: number) => void;
    searchPhoneSelected: string;
}

export const NavUser: FC<IProps> = ({searchPhoneSelected, setTotalPageActive, setTotalPageArchive}) => {

    const [numbActive, setNumbActive] = useState<number>(0)
    const [numbArchive, setNumbArchive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const getCount = async () => {
        try{
            setIsLoading(true)
            const {count: active, totalPage: totalPageActive} = await orderService.getCountUser(searchPhoneSelected, true)
            const {count: archive, totalPage: totalPageArchive} = await orderService.getCountUser(searchPhoneSelected, false)
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
        if(searchPhoneSelected){
            getCount()
        }       
    }, [searchPhoneSelected])

    return (
        <NavLinks 
            isLoading={isLoading}
            numbActive={numbActive}
            numbArchive={numbArchive}
            linkActive={ADMIN_ORDERLIST_USER_ACTIVE_ROUTE}
            linkArchive={ADMIN_ORDERLIST_USER_ARCHIVE_ROUTE}
        />
    )
}