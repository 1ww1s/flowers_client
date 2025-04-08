import { FC } from "react";
import classes from './detailPrice.module.scss'
import rub from '../../../../shared/lib/assets/icon/Rub.png'

interface IProps {
    name: string;
    price: string;
}

export const DetailPrice: FC<IProps> = ({name, price}) => {

    return (
       <section className={classes.priceBox}>
            <span className={classes.name}>{name}</span>
            <span className={classes.dashed}></span>
            <span className={classes.value}>{price} <img src={rub} /></span>
        </section>
    )
}