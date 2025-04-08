import { FC } from 'react'
import classes from './deliveryPrice.module.scss'
import { Warning } from '../../../../shared';
import rub from '../../../../shared/lib/assets/icon/Rub.png'


interface IProps {
    price: number;
    error: string;
}

export const DeliveryPrice: FC<IProps> = ({price, error}) => {


    return (
        <section className={classes.deliveryPrice}>
        <h3>Стоимость</h3>
        {
            error
                ?
            <section className={classes.error}><Warning title={error} /></section>
                :
            <section className={classes.priceBox}>Стоимость доставки - <span className={classes.price}>{price} <img src={rub} /></span></section>
        }

           
        </section>
    )
}