import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from './orderlist.module.scss'
import { Nav } from "../../entities/order";
import { useEffect, useState } from "react";
import { ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ROUTE } from "../../app/router/routes";
import { Pagination } from "../../features/pagination";
import { Helmet } from "react-helmet-async";


export default function OrderlistLayout() {
    const {pathname} = useLocation()
    const router = useNavigate()

    const [totalPageActive, setTotalPageActive] = useState<number>(0)
    const [totalPageArchive, setTotalPageArchive] = useState<number>(0)

    useEffect(() => {
        if(pathname === ORDERLIST_ROUTE.path){
            router(ORDERLIST_ACTIVE_ROUTE.path, {
                replace: true
            })
        }
    }, [])
    
    return (
        <section className={classes.orderlist}>
            <Helmet>
                <title>Мои заказы</title>
                <meta name="description" content={totalPageActive && totalPageArchive ? `Количество актуальных заказов: ${totalPageActive}. Количество завершенных заказов: ${totalPageArchive}`: ''} />
                <meta property="og:title" content='Мои заказы' />
                <meta property="og:description" content={totalPageActive && totalPageArchive ? `Количество актуальных заказов: ${totalPageActive}. Количество завершенных заказов: ${totalPageArchive}`: ''} />
            </Helmet>
            <h2>Мои заказы</h2>
            <Nav setTotalPageActive={setTotalPageActive} setTotalPageArchive={setTotalPageArchive} />
            <Outlet />
            <section className={classes.pagination}>
                <Pagination totalPages={pathname.includes('active') ? totalPageActive : totalPageArchive} />
            </section>
        </section>
    )
}