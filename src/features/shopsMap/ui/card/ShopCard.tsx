import { FC, MouseEvent, PropsWithChildren } from "react";
import { IShop } from "../../../../entities/shop";
import classes from './card.module.scss'


interface IProps {
    shop: IShop;
}

export const ShopsCard: FC<IProps & PropsWithChildren> = ({shop}) => {


    return (
        <section id="balloonActive" className={classes.card}>
            <section className={classes.data}>
                <span className={classes.sign}>Название</span>
                <span className={classes.text}>{shop.title}</span>
            </section>
            <section className={classes.data}>
                <span className={classes.sign}>Адрес</span>
                <span className={classes.text}>{shop.address}</span>
            </section>
            <section className={classes.hr} />
            <section className={classes.data}>
                <span className={classes.sign}>Часы работы</span>
                <span className={classes.text}>{shop.openingHours}</span>
            </section>
            <section className={classes.hr} />
            
        </section>
    )
}