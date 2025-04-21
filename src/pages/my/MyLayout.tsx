import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store/store";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from './my.module.scss'
import { Nav } from "../../entities/user";
import { LOGIN_ROUTE, MY_MAIN_ROUTE, MY_ROUTE } from "../../app/router/routes";
import { Sign } from "./sign/Sign";
import { Helmet } from "react-helmet-async";


export default function My(){

    const {user} = useAppSelector(s => s.UserReducer)
    const router = useNavigate()
    const {pathname} = useLocation()
    const [isOk, setIsOk] = useState<boolean>(false)

    useEffect(() => {
        if(!user.isAuth){
            router(LOGIN_ROUTE.path, {
                replace: true
            })
        }
        else{
            setIsOk(true)
        }
    }, [user])

    useEffect(() => {
        window.scrollTo({top: 0})
        if(user.isAuth && pathname === MY_ROUTE.path){
            router(MY_MAIN_ROUTE.path, {
                replace: true
            })
        }
    }, [pathname])


    return (
        <section className={classes.my}>
            <Helmet>
                <title>Личный кабинет</title>
                <meta name="description" content="Личный кабинет" />
            </Helmet>
        {
            isOk
                &&
            <>
                <Sign />
                <section className={classes.wrapper}>
                    <Nav />
                    <Outlet />
                </section>
            </>
        }
        </section>
    )
}