import { FC, useEffect } from "react";
import classes from './goToPurchase.module.scss'
import { MyButton } from "../../../../shared";
import { Link } from "react-router-dom";
import { PURCHASE_STEP1_ROUTE } from "../../../../app/router/routes";


export const GoToPurchase: FC = () => {

    return (
        <section className={classes.goToCheckout}>
            <Link to={PURCHASE_STEP1_ROUTE.path}>
                <section className={classes.desktop}>
                    <MyButton 
                        sign="Перейти к оформлению"
                        onClick={() => {}}
                    />
                </section>
                <section className={classes.adesktop}>
                    <MyButton 
                        sign="Далее"
                        onClick={() => {}}
                    />
                </section>
            </Link>
        </section>
    )
}