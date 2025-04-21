import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useMatches, useNavigate } from "react-router-dom";
import { ADMIN_ORDER_ROUTE, ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ROUTE, MY_MAIN_ROUTE } from "../../app/router/routes";
import classes from './admin.module.scss'
import { NavAdmin } from "../../entities/user";
import { useAppSelector } from "../../app/store/store";
import { Helmet } from "react-helmet-async";

export default function Admin() {

    const {pathname} = useLocation()
    const router = useNavigate()
    const {user} = useAppSelector(s => s.UserReducer)
    const [isOk, setIsOk] = useState<boolean>(false)
    const match = useMatch(ADMIN_ORDER_ROUTE.path);
    const fullPage = match?.params.id
  
    useEffect(() => {
        let right: boolean = false
        for (let role of JSON.parse(process.env.REACT_APP_ADMIN_ACCESS || "[]")){
            if(user.roles.includes(role)){
                right = true;
                setIsOk(true)
                break
            }
        }
        if(!right) {
            router(MY_MAIN_ROUTE.path, {
                replace: true
            })
        }
    }, [])

    useEffect(() => {
        if(pathname === ADMIN_ROUTE.path)
            router(ADMIN_ORDERLIST_ACTIVE_ROUTE.path, {
                replace: true
            })
    }, [])

    return (
        <section className={classes.adminBoard}>
        <Helmet>
            <title>Админ панель</title>
            <meta name="description" content="Админ панель" />
        </Helmet>
        {
            isOk
                &&
            <>
                <aside className={classes.sidebar + (fullPage ? (' ' + classes.none) : '')}>
                    <NavAdmin />
                </aside>
                <main className={classes.content + (fullPage ? (' ' + classes.full) : '')}>
                    <Outlet />
                </main>
            </>
        }
        </section>
    )
}