import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from './orderlist.module.scss'
import { Nav } from "../../entities/order";
import { useEffect } from "react";
import { ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ROUTE } from "../../app/router/routes";


export default function OrderlistLayout() {
    const {pathname} = useLocation()
    const router = useNavigate()
    useEffect(() => {
        if(pathname === ORDERLIST_ROUTE.path){
            router(ORDERLIST_ACTIVE_ROUTE.path, {
                replace: true
            })
        }
    }, [])
    
    return (
        <section className={classes.orderlist}>
                <h2>Мои заказы</h2>
                <Nav />
                <Outlet />
        </section>
    )
}