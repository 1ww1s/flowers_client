import { FC, useEffect } from "react";
import { Auth } from "../../../features/auth";
import classes from './auth.module.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MY_MAIN_ROUTE } from "../../../app/router/routes";
import { useAppSelector } from "../../../app/store/store";
import { Helmet } from "react-helmet-async";
import { VKAuthButton } from "../../../features/vkAuth";

export const AuthWidget: FC = () => {

    const {user} = useAppSelector(s => s.UserReducer)
    const router = useNavigate()
    const {pathname} = useLocation()
    const isLogin = pathname === LOGIN_ROUTE.path
    const title = isLogin ? "ВХОД В ЛИЧНЫЙ КАБИНЕТ" : "РЕГИСТРАЦИЯ"

    useEffect(() => {
        if(user.isAuth){
            router(MY_MAIN_ROUTE.path, {
                replace: true
            })
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>{title[0] + title.toLocaleLowerCase().slice(1)}</title>
                <meta name="description" content="Вход или регистрация" />
                <meta property="og:title" content={title[0] + title.toLocaleLowerCase().slice(1)} />
                <meta property="og:description" content='Вход или регистрация'/>
            </Helmet>
        {
            !user.isAuth
                &&
            <section className={classes.auth}>
                <section className={classes.wrap}>
                    <Auth title={title} isLogin={isLogin} />
                    <span className={classes.or}>ИЛИ</span>
                    <VKAuthButton />
                </section>
            </section>
        }
        </>
    )
}