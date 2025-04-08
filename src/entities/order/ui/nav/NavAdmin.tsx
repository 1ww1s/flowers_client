import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import { ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ORDERLIST_ARCHIVE_ROUTE, ADMIN_ORDERLIST_ROUTE } from "../../../../app/router/routes";
import { NumbItems } from "../../../../shared";
import { useAppSelector } from "../../../../app/store/store";
import { orderService } from "../../api/OrderService";


export const NavAdmin: FC = () => {

    const {pathname} = useLocation()
    const [numbActive, setNumbActive] = useState<number>(0)
    const [numbArchive, setNumbArchive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {shop} = useAppSelector(s => s.ShopReducer)

    const getCount = async () => {
        try{
            setIsLoading(true)
            const active = await orderService.getCountShop(shop.id, true)
            const archive = await orderService.getCountShop(shop.id, false)
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
        if(shop.id){
            getCount()
        }       
    }, [shop])

    return (
        <section className={classes.nav}>
            <ul>
                <li>
                    <Link 
                        className={pathname === ADMIN_ORDERLIST_ACTIVE_ROUTE.path ? classes.selected : ''} 
                        to={ADMIN_ORDERLIST_ACTIVE_ROUTE.path}>{ADMIN_ORDERLIST_ACTIVE_ROUTE.name}
                    </Link>
                    <section className={classes.numbItems}>
                        <NumbItems numb={numbActive} borderColor={false} isLoading={isLoading} />
                    </section>
                </li>
                <li>
                    <Link 
                        className={pathname === ADMIN_ORDERLIST_ARCHIVE_ROUTE.path ? classes.selected : ''} 
                        to={ADMIN_ORDERLIST_ARCHIVE_ROUTE.path}>{ADMIN_ORDERLIST_ARCHIVE_ROUTE.name}
                    </Link>
                    <section className={classes.numbItems}>
                        <NumbItems numb={numbArchive} borderColor={false} isLoading={isLoading} />
                    </section>
                </li>
            </ul>
        </section>
    )
}