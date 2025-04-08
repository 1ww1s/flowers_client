import { useEffect } from 'react'
import classes from './purchaseLayout.module.scss'
import { Outlet, useLocation } from 'react-router-dom';
import { useOrderActions } from '../../../entities/order';

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
            <section className={classes.wrap}>
                <section className={classes.content}>
                    <Outlet  />
                </section>
            </section>
        </section>
    )
}