import { FC } from "react";
import classes from './nav.module.scss'
import { Link, useLocation } from "react-router-dom";
import { IRoute } from "../../../../app/router/types";
import { NumbItems } from "../../../../shared";

interface IProps {
    numbActive: number;
    numbArchive: number;
    linkActive: IRoute;
    linkArchive: IRoute;
    isLoading: boolean;
}

export const NavLinks: FC<IProps> = ({linkActive, linkArchive, numbActive, numbArchive, isLoading}) => {

    const {pathname} = useLocation()

    return (
        <section className={classes.nav}>
            <ul>
                <li>
                    <Link
                        className={pathname === linkActive.path ? classes.selected : ''} 
                        to={linkActive.path}>{linkActive.name}
                    </Link>
                    <section className={classes.numbItems}>
                        <NumbItems numb={numbActive} borderColor={false} isLoading={isLoading} />
                    </section>
                </li>
                <li>
                    <Link 
                        className={pathname === linkArchive.path ? classes.selected : ''} 
                        to={linkArchive.path}>{linkArchive.name}
                    </Link>
                    <section className={classes.numbItems}>
                        <NumbItems numb={numbArchive} borderColor={false} isLoading={isLoading} />
                    </section>
                </li>
            </ul>
        </section>
    )
}