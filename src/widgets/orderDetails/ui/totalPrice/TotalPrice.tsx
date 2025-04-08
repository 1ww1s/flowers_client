import { FC } from "react";
import classes from './totalPrice.module.scss'
import rub from '../../../../shared/lib/assets/icon/Rub.png'
import { getFormatPrice } from "../../../../entities/product";


interface IProps{
    totalPrice: number;
}

export const TotalPrice: FC<IProps> = ({totalPrice}) => {

    return (
        <section className={classes.totalPrice}>
            <span className={classes.title}>Итого:</span>
            <span className={classes.price}>{getFormatPrice(`${totalPrice}`)} <img src={rub} alt="Rub" /></span>
        </section>
    )
}