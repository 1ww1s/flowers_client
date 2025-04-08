import { FC } from "react";
import { useAppSelector } from "../../../../app/store/store";
import classes from './makingAnOrder.module.scss'
import rub from '../../../../shared/lib/assets/icon/Rub.png'
import { GoToPurchase } from "../goToPurchase/GoToPurchase";
import { LoaderDiv } from "../../../../shared";

interface IProps {
    totalPrice: number;
}

export const MakingAnOrder: FC<IProps> = ({totalPrice}) => {

    const {user, isLoading} = useAppSelector(s => s.UserReducer)
    let count = 0;
    user.basket.forEach(b => count += b.count)

    return (
        isLoading
            ?
        <section className={classes.loader}><LoaderDiv /></section>
            :
        count === 0
            ?
        <></>
            :
        <section className={classes.makingAnOrder}>
            <h2 className={classes.title}>Детали заказа</h2>
            <section className={classes.count}>{count + " " + (count > 4 ? 'товаров' : count > 1 ? 'товара' : 'товар')}</section>
            <section className={classes.totalPrice}>
                <span className={classes.title}>Итого:</span>
                <span className={classes.price}>{totalPrice} <img src={rub} alt="Rub" /></span>
            </section>
            <GoToPurchase />
        </section>
    )
}