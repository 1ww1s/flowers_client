import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from './orderlist.module.scss'
import { NavAdmin, NavUser } from "../../../entities/order";
import { useEffect, useState } from "react";
import { ADMIN_ORDERLIST_USER_ACTIVE_ROUTE, ADMIN_ORDERLIST_USER_LAYOUT_ROUTE } from "../../../app/router/routes";
import { Pagination } from "../../../features/pagination";
import { SearchPhoneSelectedOrder } from "../../../features/searchPhoneSelectedOrder";
import { getPhoneFormat } from "../../../shared";


export default function AdminOrderlistUserLayout() {
    const router = useNavigate()
    const {pathname} = useLocation()
    const [options, setOptions] = useState<{name: string, value: string}[]>([])
    const [totalPageActive, setTotalPageActive] = useState<number>(0)
    const [totalPageArchive, setTotalPageArchive] = useState<number>(0)

    const [searchPhoneSelected, setSearchPhoneSelected] = useState<string>('')

    useEffect(() => {
        if(pathname === ADMIN_ORDERLIST_USER_LAYOUT_ROUTE.path){
            router(ADMIN_ORDERLIST_USER_ACTIVE_ROUTE.path, {
                replace: true
            })
        }
       
    }, [])


    return (
        <section className={classes.orderlist}>
            <SearchPhoneSelectedOrder setSearchPhoneSelected={setSearchPhoneSelected} />
            {
                searchPhoneSelected
                    ?
                <>
                    <h2 className={classes.userPhone}>Заказы пользователя <span>{getPhoneFormat(searchPhoneSelected)}</span></h2>
                    <NavUser setTotalPageActive={setTotalPageActive} setTotalPageArchive={setTotalPageArchive} searchPhoneSelected={searchPhoneSelected} />
                    <Outlet context={{searchPhoneSelected}} />
                    <section className={classes.pagination}>
                        <Pagination totalPages={pathname.includes('active') ? totalPageActive : totalPageArchive} />
                    </section>
                </>
                    :
                <></>
            }
        </section>
    )
}