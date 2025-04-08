import { FC } from "react";
import classes from './bottom.module.scss'
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../../../app/router/routes";
import { About } from "../about/About";
import { Categories } from "../categories/Categories";
import { Requisites } from "../requisites/Requisites";


export const Bottom: FC = () => {

    const {pathname} = useLocation()

    const aShow = pathname === LOGIN_ROUTE.path || pathname === REGISTRATION_ROUTE.path

    return (
        aShow
            ?
        <></>
            :
        <section className={classes.bottom}>
            <section className={classes.wrap}>
                <About />
                <Categories />
                <Requisites />
            </section>
        </section>
    )
}