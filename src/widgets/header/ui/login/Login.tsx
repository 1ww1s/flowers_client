import { FC, use } from "react";
import { IUser } from "../../../../entities/user";
import classes from '../userInfo.module.scss' 
import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, MY_ROUTE } from "../../../../app/router/routes";
import { useAppSelector } from "../../../../app/store/store";

interface IProps {
    user: IUser;
}

export const Login: FC<IProps> = ({user}) => {

    const location = useLocation()

    return (
        <Link state={location.pathname} to={user.isAuth ? MY_ROUTE.path : LOGIN_ROUTE.path}>
            <figure className={classes.info}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.90625 20.25C3.82775 18.6536 5.15328 17.3279 6.74958 16.4061C8.34588 15.4844 10.1567 14.9992 12 14.9992C13.8433 14.9992 15.6541 15.4844 17.2504 16.4061C18.8467 17.3279 20.1722 18.6536 21.0938 20.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <figcaption className={classes.login}>
                    {user.isAuth ?
                        <span>{user.name}</span>
                        : 
                        <span>Войти</span>
                    }
                </figcaption>
            </figure>
        </Link>
    )
}