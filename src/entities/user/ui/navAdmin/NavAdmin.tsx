import { FC, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './nav.module.scss'
import { ADMIN_CREATE_ROUTE, ADMIN_DELETE_ROUTE, ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ORDERLIST_ROUTE, ADMIN_ORDERLIST_USER_ACTIVE_ROUTE, ADMIN_ORDERLIST_USER_LAYOUT_ROUTE, ADMIN_OTHER_ROUTE, 
    ADMIN_ROUTE, ADMIN_UPDATE_ROUTE, MY_MAIN_ROUTE, ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ROUTE } from "../../../../app/router/routes";

export const NavAdmin: FC = () => {

    const {pathname} = useLocation()

    const ref = useRef<HTMLDivElement>(null)
    const refDarken = useRef<HTMLDivElement>(null)

    const toggle = () => {
        if(ref.current && refDarken.current){
            ref.current.classList.toggle(classes.open)
            refDarken.current.classList.toggle(classes.open)
        }
    }

    useEffect(() => {
        if(ref.current && refDarken.current){
            ref.current.classList.remove(classes.open)
            refDarken.current.classList.remove(classes.open)
        }
    }, [pathname])


    return (
        <>
            <section ref={refDarken} onClick={toggle} className={classes.darken} />
            <section className={classes.navBurger}>
                <svg onClick={toggle} className={classes.burger} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8.5H27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 13.5H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 18.5H27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 23.5H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>
            <section ref={ref} className={classes.navAdmin}>
                <ul>
                    <li>
                        <Link className={pathname.includes(ADMIN_ORDERLIST_ROUTE.path) ? classes.selected : ''} to={ADMIN_ORDERLIST_ACTIVE_ROUTE.path}>{ADMIN_ORDERLIST_ROUTE.name}</Link>
                    </li>
                    <li>
                        <Link className={pathname === ADMIN_CREATE_ROUTE.path ? classes.selected : ''} to={ADMIN_CREATE_ROUTE.path}>{ADMIN_CREATE_ROUTE.name}</Link>
                    </li>
                    <li>
                        <Link className={pathname === ADMIN_UPDATE_ROUTE.path ? classes.selected : ''} to={ADMIN_UPDATE_ROUTE.path}>{ADMIN_UPDATE_ROUTE.name}</Link>
                    </li>
                    <li>
                        <Link className={pathname === ADMIN_DELETE_ROUTE.path ? classes.selected : ''} to={ADMIN_DELETE_ROUTE.path}>{ADMIN_DELETE_ROUTE.name}</Link>
                    </li>
                    <li>
                        <Link className={pathname.includes(ADMIN_ORDERLIST_USER_LAYOUT_ROUTE.path) ? classes.selected : ''} to={ADMIN_ORDERLIST_USER_ACTIVE_ROUTE.path}>{ADMIN_ORDERLIST_USER_LAYOUT_ROUTE.name}</Link>
                    </li>
                    <li>
                        <Link className={pathname === ADMIN_OTHER_ROUTE.path ? classes.selected : ''} to={ADMIN_OTHER_ROUTE.path}>{ADMIN_OTHER_ROUTE.name}</Link>
                    </li>
                </ul>
            </section>
        </>
    )
}