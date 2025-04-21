import { FC } from "react";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../../../app/router/routes";
import classes from './nav.module.scss'
import { NavMainSidebar } from "../sidebar/NavMainSidebar";


export const NavMainDesctop: FC = () => {

    const {pathname} = useLocation()

    const aShow = pathname === LOGIN_ROUTE.path || pathname === REGISTRATION_ROUTE.path;

    return (
        aShow
            ?
        <></>
            :
        <section className={classes.desctop}>
            <NavMainSidebar />
        </section>
    )
}