import { FC, PropsWithChildren } from "react";
import classes from './basketItem.module.scss'
import { IBasket } from "../../model/types";
import rub from '../../../../shared/lib/assets/icon/Rub.png'
import { ItemLoader } from "../itemLoader/ItemLoader";
import { Link } from "react-router-dom";

interface IProps{
    item: IBasket;
    getForamtPrice: (price: string) => string;
    isLoading: boolean;
}

export const BasketItem: FC<IProps & PropsWithChildren> = ({item, getForamtPrice, isLoading, children}) => {

    console.log(item)

    return (
        <section className={classes.item}>

            {
            isLoading 
                ?
            <ItemLoader /> 
                :
            <>
            <section className={classes.image}>
                <Link to={`/catalog/${item.categorySlug}/${item.slug}`}>
                    <img src={item.image} />
                </Link>
            </section>
            <section className={classes.data}>
                <section className={classes.name}>
                    <Link to={`/catalog/${item.categorySlug}/${item.slug}`}>
                        <span>{item.name}</span>
                    </Link>
                </section>
                <section className={classes.features}>
                    {children}
                </section>
                <section className={classes.price}>
                    <section className={classes.box}>
                        {getForamtPrice(`${item.price * item.count}`)}
                        <img src={rub} />
                    </section>
                </section>
            </section>
            </>
            }      

        </section>
    )
}