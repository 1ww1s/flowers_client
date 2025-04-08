import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import {  ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ARCHIVE_ROUTE } from "../../../../app/router/routes";
import { NumbItems } from "../../../../shared/ui/numbItems/NumbItems";
import { userService } from "../../../user";


export const Nav: FC = () => {

    const {pathname} = useLocation()
    const [numbActive, setNumbActive] = useState<number>(0)
    const [numbArchive, setNumbArchive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const getCount = async () => {
        try{
            setIsLoading(true)
            const active = await userService.getCountOrders(true)
            const archive = await userService.getCountOrders(false)
            setNumbActive(active)
            setNumbArchive(archive)
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
        <section className={classes.nav}>
            <ul>
                <li>
                    <Link 
                        className={pathname === ORDERLIST_ACTIVE_ROUTE.path ? classes.selected : ''} 
                        to={ORDERLIST_ACTIVE_ROUTE.path}>{ORDERLIST_ACTIVE_ROUTE.name}
                    </Link>
                    <section className={classes.numbItems}>
                        <NumbItems 
                            numb={numbActive} 
                            borderColor={false} 
                            isLoading={isLoading} 
                        />
                    </section>
                </li>
                <li>
                    <Link 
                        className={pathname === ORDERLIST_ARCHIVE_ROUTE.path ? classes.selected : ''} 
                        to={ORDERLIST_ARCHIVE_ROUTE.path}>{ORDERLIST_ARCHIVE_ROUTE.name}
                    </Link>
                    <section className={classes.numbItems}>
                        <NumbItems 
                            numb={numbArchive} 
                            borderColor={false} 
                            isLoading={isLoading} 
                        />
                    </section>
                </li>
            </ul>
        </section>
    )
}