import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import { ADMIN_CREATE_ROUTE, ADMIN_DELETE_ROUTE, ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ORDERLIST_ROUTE, ADMIN_OTHER_ROUTE, 
    ADMIN_ROUTE, ADMIN_UPDATE_ROUTE, MY_MAIN_ROUTE, ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ROUTE } from "../../../../app/router/routes";


export const NavAdmin: FC = () => {

    const {pathname} = useLocation()

    return (
        <section className={classes.navAdmin}>
            <ul>
                <li>
                    <Link className={pathname.includes(ADMIN_ORDERLIST_ROUTE.path) ? classes.selected : ''} to={ADMIN_ORDERLIST_ACTIVE_ROUTE.path}>{ADMIN_ORDERLIST_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname === ADMIN_CREATE_ROUTE.path ? classes.selected : ''} to={ADMIN_CREATE_ROUTE.path}>{ADMIN_CREATE_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname === ADMIN_UPDATE_ROUTE.path ? classes.selected : ''} to={ADMIN_UPDATE_ROUTE.path}>{ADMIN_UPDATE_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname === ADMIN_DELETE_ROUTE.path ? classes.selected : ''} to={ADMIN_DELETE_ROUTE.path}>{ADMIN_DELETE_ROUTE.name}</Link>
                </li>
                <li>
                    <Link className={pathname === ADMIN_OTHER_ROUTE.path ? classes.selected : ''} to={ADMIN_OTHER_ROUTE.path}>{ADMIN_OTHER_ROUTE.name}</Link>
                </li>
            </ul>
        </section>
    )
}