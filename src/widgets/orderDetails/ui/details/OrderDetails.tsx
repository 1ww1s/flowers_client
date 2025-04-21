import { FC, PropsWithChildren } from "react";
import classes from './details.module.scss'
import { LoaderDiv } from "../../../../shared";
import { TotalPrice } from "../totalPrice/TotalPrice";
import { DetailPrice } from "../detailPrice/DetailPrice";
import { getFormatPrice } from "../../../../entities/product";
import { useAppSelector } from "../../../../app/store/store";

interface IProps {
    productsPrice?: number;
    deliveryPrice?: number;
    productCount: number;
    isLoading?: boolean;
}

export const OrderDetails: FC<IProps & PropsWithChildren> = ({productsPrice, productCount: count, deliveryPrice=0, isLoading, children}) => {

    const {orderCreate} = useAppSelector(s => s.OrderReducer)

    return (
        <section className={classes.details}>
            <h2 className={classes.title}>Детали заказа</h2>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderDiv /></section>
                    :
                <>
                <section className={classes.count}>
                {
                    productsPrice
                        ?
                    <>
                        <DetailPrice 
                            name={count + " " + ((count > 4 || (count === 0)) ? 'товаров' : count > 1 ? 'товара' : 'товар')}
                            price={getFormatPrice(`${productsPrice}`)}
                        />
                        {
                            orderCreate.methodOfReceipt === 'Доставка' && deliveryPrice !== 0
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
                    (orderCreate.methodOfReceipt === 'Доставка' && deliveryPrice !== 0)
                        ?
                    <TotalPrice totalPrice={productsPrice + deliveryPrice} />
                        :
                    <TotalPrice totalPrice={productsPrice} />
                        :
                    <></>
                }
                <section className={classes.button}>
                    {children}
                </section>
                </>
            }
        </section>
    )
}