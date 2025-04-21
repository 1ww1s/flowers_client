import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import { ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ROUTE, MY_BASKET_ROUTE, MY_FAVOURITES_ROUTE, MY_MAIN_ROUTE, ORDER_ROUTE, ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ROUTE } from "../../../../app/router/routes";
import { useAppSelector } from "../../../../app/store/store";

export const Nav: FC = () => {

    const {pathname} = useLocation()
    const {user} = useAppSelector(s => s.UserReducer)

    
    let adminAccess: boolean = false
    for (let role of JSON.parse(process.env.REACT_APP_ADMIN_ACCESS || "[]")){
        if(user.roles.includes(role)){
            adminAccess = true;
            break
        }
    }

    return (
        <section className={classes.nav}>
            <ul>
                <li>
                    <Link 
                        className={pathname === MY_MAIN_ROUTE.path ? classes.selected : ''} 
                        to={MY_MAIN_ROUTE.path}
                    >
                        <svg className={classes.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.90625 20.25C3.82775 18.6536 5.15328 17.3279 6.74958 16.4061C8.34588 15.4844 10.1567 14.9992 12 14.9992C13.8433 14.9992 15.6541 15.4844 17.2504 16.4061C18.8467 17.3279 20.1722 18.6536 21.0938 20.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className={classes.desctop}>{MY_MAIN_ROUTE.name}</span>
                        <span className={classes.adesctop}>Я</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        className={(pathname.includes(ORDERLIST_ROUTE.path) || pathname.includes(ORDER_ROUTE.path.slice(0, -3))) ? classes.selected : ''} 
                        to={ORDERLIST_ACTIVE_ROUTE.path}
                    >
                        <svg className={classes.icon + ' ' + classes.fill} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5625 5.5H16.5625" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.5625 11H16.5625" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.5625 16.5H16.5625" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.75 6.5C4.30228 6.5 4.75 6.05228 4.75 5.5C4.75 4.94772 4.30228 4.5 3.75 4.5C3.19772 4.5 2.75 4.94772 2.75 5.5C2.75 6.05228 3.19772 6.5 3.75 6.5Z" />
                            <path d="M3.75 12C4.30228 12 4.75 11.5523 4.75 11C4.75 10.4477 4.30228 10 3.75 10C3.19772 10 2.75 10.4477 2.75 11C2.75 11.5523 3.19772 12 3.75 12Z" />
                            <path d="M3.75 17.5C4.30228 17.5 4.75 17.0523 4.75 16.5C4.75 15.9477 4.30228 15.5 3.75 15.5C3.19772 15.5 2.75 15.9477 2.75 16.5C2.75 17.0523 3.19772 17.5 3.75 17.5Z" />
                        </svg>
                       {ORDERLIST_ROUTE.name}
                    </Link>
                </li>
                <li>
                    <Link 
                        className={pathname === MY_FAVOURITES_ROUTE.path ? classes.selected : ''} 
                        to={MY_FAVOURITES_ROUTE.path}
                    >
                        <svg className={classes.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20.25C12 20.25 2.625 15 2.625 8.625C2.625 7.49802 3.01546 6.40585 3.72996 5.5343C4.44445 4.66276 5.43884 4.06569 6.54393 3.84467C7.64903 3.62365 8.79657 3.79234 9.79131 4.32203C10.7861 4.85173 11.5665 5.70971 12 6.75C12.4335 5.70971 13.2139 4.85173 14.2087 4.32203C15.2034 3.79234 16.351 3.62365 17.4561 3.84467C18.5612 4.06569 19.5555 4.66276 20.27 5.5343C20.9845 6.40585 21.375 7.49802 21.375 8.625C21.375 15 12 20.25 12 20.25Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {MY_FAVOURITES_ROUTE.name}
                    </Link>
                </li>
                <li>
                    <Link 
                        className={pathname === MY_BASKET_ROUTE.path ? classes.selected : ''} 
                        to={MY_BASKET_ROUTE.path}
                    >
                        <svg className={classes.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5749 20.25H4.42488C4.24033 20.2491 4.06242 20.1811 3.92439 20.0586C3.78636 19.9361 3.69766 19.7675 3.67488 19.5844L2.34363 7.58438C2.33179 7.47982 2.34208 7.37394 2.37384 7.27363C2.4056 7.17331 2.45811 7.0808 2.52796 7.0021C2.59781 6.92341 2.68344 6.8603 2.77928 6.81686C2.87513 6.77343 2.97903 6.75065 3.08426 6.75H20.9155C21.0207 6.75065 21.1246 6.77343 21.2205 6.81686C21.3163 6.8603 21.4019 6.92341 21.4718 7.0021C21.5416 7.0808 21.5942 7.17331 21.6259 7.27363C21.6577 7.37394 21.668 7.47982 21.6561 7.58438L20.3249 19.5844C20.3021 19.7675 20.2134 19.9361 20.0754 20.0586C19.9373 20.1811 19.7594 20.2491 19.5749 20.25V20.25Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.25 6.75C8.25 5.75544 8.64509 4.80161 9.34835 4.09835C10.0516 3.39509 11.0054 3 12 3C12.9946 3 13.9484 3.39509 14.6517 4.09835C15.3549 4.80161 15.75 5.75544 15.75 6.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {MY_BASKET_ROUTE.name}
                    </Link>
                </li>
                {
                    adminAccess
                        &&
                    <li>
                        <Link 
                            className={pathname.includes(ADMIN_ROUTE.path) ? classes.selected : ''} 
                            to={ADMIN_ORDERLIST_ACTIVE_ROUTE.path}
                        >
                            <svg className={classes.icon} width="16" height="16" viewBox="3 3 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.97498 24.925C8.72736 23.4431 9.87542 22.1984 11.2919 21.3289C12.7084 20.4595 14.3379 19.9993 16 19.9993C17.662 19.9993 19.2916 20.4595 20.708 21.3289C22.1245 22.1984 23.2726 23.4431 24.025 24.925" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {ADMIN_ROUTE.name}
                        </Link>
                    </li>
                }
            </ul>
        </section>
    )
}