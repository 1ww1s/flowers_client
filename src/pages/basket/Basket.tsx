import { useState } from "react";
import { BasketWidget } from "../../widgets/basketWidget";
import { MakingAnOrder } from "../../widgets/makingAnOrder";
import classes from './basket.module.scss'
import { CATALOG_ROUTE } from "../../app/router/routes";
import { useLocation } from "react-router-dom";
import { ComeBack } from "../../features/comeBack";


export default function Basket(){

    const [totalPrice, setTotalPrice] = useState<number>(0)
    const {state} = useLocation()
    const {pathname} = useLocation()
    const isMy = pathname.includes('my')

    return (
        <section className={classes.basket}>
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
                    <section className={classes.makingAnOrder}>
                        <MakingAnOrder totalPrice={totalPrice} />
                    </section>
                </section>
            </section>
        </section>
    )
}
