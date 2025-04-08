import { FC, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from './nav.module.scss'
import { ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, FAVOURITES_ROUTE, MY_BASKET_ROUTE, MY_FAVOURITES_ROUTE, MY_MAIN_ROUTE, MY_ROUTE, ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ROUTE } from "../../../../app/router/routes";


export const Nav: FC = () => {

    const {pathname} = useLocation()

    return (
        <section className={classes.nav}>
            <ul>
                <li>
                    <Link className={pathname === MY_MAIN_ROUTE.path ? classes.selected : ''} to={MY_MAIN_ROUTE.path}>{MY_MAIN_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname.includes(ORDERLIST_ROUTE.path) ? classes.selected : ''} to={ORDERLIST_ACTIVE_ROUTE.path}>{ORDERLIST_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname === MY_BASKET_ROUTE.path ? classes.selected : ''} to={MY_BASKET_ROUTE.path}>{MY_BASKET_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname === MY_FAVOURITES_ROUTE.path ? classes.selected : ''} to={MY_FAVOURITES_ROUTE.path}>{MY_FAVOURITES_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname.includes(ADMIN_ROUTE.path) ? classes.selected : ''} to={ADMIN_ORDERLIST_ACTIVE_ROUTE.path}>{ADMIN_ROUTE.name}</Link>
                </li>
            </ul>
        </section>
    )
}