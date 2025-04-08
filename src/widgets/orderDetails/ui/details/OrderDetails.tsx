import { FC, PropsWithChildren } from "react";
import classes from './details.module.scss'
import { LoaderDiv } from "../../../../shared";
import { TotalPrice } from "../totalPrice/TotalPrice";
import { DetailPrice } from "../detailPrice/DetailPrice";
import { getFormatPrice } from "../../../../entities/product";

interface IProps {
    productsPrice?: number;
    deliveryPrice?: number;
    productCount: number;
    isLoading?: boolean;
}

export const OrderDetails: FC<IProps & PropsWithChildren> = ({productsPrice, productCount: count, deliveryPrice=0, isLoading, children}) => {

    return (
        <section className={classes.details}>
        {
            isLoading
                ?
            <section className={classes.loader}><LoaderDiv /></section>
                :
            <>
            <h2 className={classes.title}>Детали заказа</h2>
            <section className={classes.count}>
            {
                productsPrice
                    ?
                <>
                    <DetailPrice 
                        name={count + " " + (count > 4 ? 'товаров' : count > 1 ? 'товара' : 'товар')}
                        price={getFormatPrice(`${productsPrice}`)}
                    />
                    {
                        deliveryPrice !== 0
                            &&
                        <DetailPrice 
                            name="Доставка"
                            price={`${deliveryPrice}`}
                        />
                    }
                </>
                    :
                <span className={classes.name}>{ count + " " + (count > 4 ? 'товаров' : count > 1 ? 'товара' : 'товар') }</span>
            }
            </section>
            {
                productsPrice
                    ?
                deliveryPrice !== 0
                    ?
                <TotalPrice totalPrice={productsPrice + deliveryPrice} />
                    :
                <TotalPrice totalPrice={productsPrice} />
                    :
                <></>
            }
            {children}
            </>
        }
        </section>
    )
}