import { FC } from "react";
import classes from './myOrders.module.scss'
import { IOrderItem, OrderPreview, OrderPreviewLoader } from "../../../entities/order";
import { getFormatPrice, ListCountsShop } from "../../../entities/product";

interface IProps {
    admin?: boolean;
    items: IOrderItem[] 
    isLoading: boolean;
    numbOrderLoader: number;
}

export const Orders: FC<IProps> = ({admin=false, items, isLoading, numbOrderLoader}) => {

    let orderLoader = []
    for(let i = 0; i < numbOrderLoader; i++){
        orderLoader.push(i)
    }

    return (
        <section className={classes.myOrders}>
            {
                isLoading  
                    ?
                orderLoader.map(o => 
                    <OrderPreviewLoader key={o} numbItems={4} isLoading={isLoading} />
                )
                    :
                items.length === 0
                    ?
                <h3>Нет заказов</h3>
                    :
                items.map((item, ind) => 
                    <OrderPreview admin={admin} getFormatPrice={getFormatPrice} key={ind} order={item}>
                        <ListCountsShop 
                            products={item.products}
                        />
                    </OrderPreview>
                )
            }
        </section>
    )
}