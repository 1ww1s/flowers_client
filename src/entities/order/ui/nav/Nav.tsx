import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import {  ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ARCHIVE_ROUTE } from "../../../../app/router/routes";
import { NumbItems } from "../../../../shared/ui/numbItems/NumbItems";
import { userService } from "../../../user";
import { NavLinks } from "./NavLinks";

interface IProps {
    setTotalPageActive: (count: number) => void;
    setTotalPageArchive: (count: number) => void;
}

export const Nav: FC<IProps> = ({setTotalPageActive, setTotalPageArchive}) => {

    const [numbActive, setNumbActive] = useState<number>(0)
    const [numbArchive, setNumbArchive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getCount = async () => {
        try{
            setIsLoading(true)
            const dataActive = await userService.getCountOrders(true)
            const dataArchive = await userService.getCountOrders(false)
            setNumbActive(dataActive.count)
            setTotalPageActive(dataActive.totalPage)
            setNumbArchive(dataArchive.count)
            setTotalPageArchive(dataArchive.totalPage)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCount()
    }, [])

    return (
        <NavLinks 
            numbActive={numbActive}
            numbArchive={numbArchive}
            isLoading={isLoading}
            linkActive={ORDERLIST_ACTIVE_ROUTE}
            linkArchive={ORDERLIST_ARCHIVE_ROUTE}
        />
    )
}