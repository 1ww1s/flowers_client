import { FC } from "react";
import classes from './nav.module.scss'
import { paths } from "../../lib/assets/routes";
import { Link, useLocation } from "react-router-dom";

export const NavMainSidebar: FC = () => {
    
    const {pathname} = useLocation()

    return (
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