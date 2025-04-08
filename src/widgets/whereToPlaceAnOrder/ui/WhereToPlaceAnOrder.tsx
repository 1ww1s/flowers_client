import { FC } from "react";
import { WrapSide } from "../../../shared";
import classes from './whereToPlaceAnOrder.module.scss'
import { Link } from "react-router-dom";
import { BASKET_ROUTE } from "../../../app/router/routes";


export const WhereToPlaceAnOrder: FC = () => {

    return (
        <section className={classes.whereToPlaceAnOrder}>
            <WrapSide> 
                <span className={classes.text}>Доставку можно оформить в <Link className={classes.link} to={BASKET_ROUTE.path}>корзине</Link></span>
            </WrapSide>
        </section>
    )
}