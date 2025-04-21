import { useState } from "react";
import { BasketWidget } from "../../widgets/basketWidget";
import { MakingAnOrder } from "../../widgets/makingAnOrder";
import classes from './basket.module.scss'
import { CATALOG_ROUTE } from "../../app/router/routes";
import { useLocation } from "react-router-dom";
import { ComeBack } from "../../features/comeBack";
import { Helmet } from "react-helmet-async";
import { useAppSelector } from "../../app/store/store";


export default function Basket(){

    const [totalPrice, setTotalPrice] = useState<number>(0)
    const {state} = useLocation()
    const {pathname} = useLocation()
    const isMy = pathname.includes('my')

    const {user} = useAppSelector(s => s.UserReducer)

    return (
        <section className={classes.basket}>
            <Helmet>
                <title>Корзина</title>
                <meta name="description" content="Моя корзина" />
            </Helmet>
            <section className={classes.wrap + (isMy ? (' ' + classes.my) : '')}>
                <h1>Корзина</h1>
                <ComeBack 
                    to={(state as string)?.includes('/catalog') ? state : CATALOG_ROUTE.path}
                    text={state ? 'Вернуться к покупкам' : 'К покупкам'}   
                />
                <section className={classes.contents}>
                    <section className={classes.items}>
                        <BasketWidget setTotalPrice={setTotalPrice} />
                    </section>
                    <section className={classes.makingAnOrder + (user.isAuth ? (' ' + classes.user) : '')}>
                        <MakingAnOrder totalPrice={totalPrice} />
                    </section>
                </section>
            </section>
        </section>
    )
}
