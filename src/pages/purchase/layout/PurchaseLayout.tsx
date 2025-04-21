import { useEffect } from 'react'
import classes from './purchaseLayout.module.scss'
import { Outlet, useLocation } from 'react-router-dom';
import { useOrderActions } from '../../../entities/order';
import { Helmet } from 'react-helmet-async';

export default function PurchaseLayout() {
    
    const {pathname} = useLocation()
    const {setInitital} = useOrderActions()

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [pathname])

    useEffect(() => {
        setInitital(null)
    }, [])

    return (
        <section className={classes.purchaseLayout}>
            <Helmet>
                <title>Оформление заказа</title>
                <meta name="description" content="Оформление заказа" />
            </Helmet>
            <meta property="og:title" content='Оформление заказа' />
            <meta property="og:description" content='Оформление заказа' />
            <section className={classes.wrap}>
                <section className={classes.content}>
                    <Outlet  />
                </section>
            </section>
        </section>
    )
}