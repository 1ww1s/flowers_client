import { FC } from "react";
import classes from './header.module.scss'
import { Logo } from "../../../shared/ui/logo/Logo";
import { Tel } from "./tel/Tel";
import { Favourites } from "./favourites/Favourites";
import { Basket } from "./basket/Basket";
import { Login } from "./login/Login";
import { useAppSelector } from "../../../app/store/store";
import { Sidebar } from "../../../features/sidebar";
import { NavMainSidebar } from "../../../features/nav";


export const Header: FC = () => {

    const {user} = useAppSelector(s => s.UserReducer)

    return (
        <div className={classes.bg}>
            <div className={classes.wrapper}>
                <section>
                    <Logo />
                </section>
                <section className={classes.information}>
                    <Tel />  
                    <Login user={user} />
                    <Favourites user={user} />
                    <Basket user={user} />
                </section>
                <section className={classes.sidebar}>
                    <Sidebar
                        topElem={
                            <section className={classes.user}>
                                <Login user={user} />
                                <section className={classes.features}>
                                    <Favourites user={user} />
                                    <Basket user={user} />
                                </section>
                            </section>
                        }
                    >
                        <NavMainSidebar />
                    </Sidebar>
                </section>
            </div>
        </div>
    )
}