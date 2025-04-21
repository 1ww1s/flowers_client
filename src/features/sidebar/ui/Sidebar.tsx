import React, { FC, PropsWithChildren, useEffect, useRef } from 'react'
import classes from './sidebar.module.scss'
import { useLocation } from 'react-router-dom';

interface IProps {
    topElem: React.ReactElement;
}

export const Sidebar: FC<IProps & PropsWithChildren> = ({topElem, children}) => {

    const refBurger = useRef<HTMLDivElement>(null)
    const refDarken = useRef<HTMLDivElement>(null)
    const refSidebar = useRef<HTMLDivElement>(null)

    const {pathname} = useLocation()

    const toggle = () => {
        if(refBurger.current && refDarken.current && refSidebar.current){
            refBurger.current.classList.toggle(classes.open)
            refDarken.current.classList.toggle(classes.open)
            refSidebar.current.classList.toggle(classes.open)
        }
    }

    const close = () => {
        if(refBurger.current && refDarken.current && refSidebar.current){
            refBurger.current.classList.remove(classes.open)
            refDarken.current.classList.remove(classes.open)
            refSidebar.current.classList.remove(classes.open)
        }
    }

    useEffect(() => {
        close()
    }, [pathname])


    return (
        <>
            <section onClick={close} ref={refDarken} className={classes.darken}></section>
            <section ref={refBurger} className={classes.burger}>
                <svg onClick={toggle} className={classes.bg} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 17H19M5 12H19M5 7H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg onClick={toggle} className={classes.close} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>
            <section ref={refSidebar} className={classes.sidebar}>
                <section className={classes.top}>
                    {topElem}
                </section>
                <section className={classes.bottom}>
                    {children}
                </section>
            </section>
        </>
    )
}