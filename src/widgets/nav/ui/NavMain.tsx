import { FC } from "react";
import classes from './nav.module.scss'
import { Link, useLocation } from "react-router-dom";
import { paths } from "../lib/assets/routes";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../../app/router/routes";



export const NavMain: FC = () => {

    const {pathname} = useLocation()

    const aShow = pathname === LOGIN_ROUTE.path || pathname === REGISTRATION_ROUTE.path;

    return (
        aShow
            ?
        <></>
            :
        <section className={classes.navMain}>
            <section className={classes.wrapper}>
                <nav>
                    <ul>
                        {paths.map(path => 
                            <li key={path.name}>
                                <Link 
                                    className={classes.link + (pathname.includes(path.path) ? ' ' + classes.selected : '')} 
                                    to={path.path}
                                >
                                    {path.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </section>
        </section>
    )
}