import { FC } from "react";
import classes from './availableAndUnavailableProducts.module.scss'
import { getNumb } from "../../lib/assets/getNumb";
import { ListCountsShop } from "../listCountsShop/ListCountsShop";

interface IProps {
    products: {count: number, image: string}[];
    available?: boolean;
    title?: boolean;
}

export const AvailableAndUnavailableProducts: FC<IProps> = ({products, available=true, title=true}) => {

    const count = getNumb(products.map(p => p.count))

    return (
        <section>
                {
                    title
                        ?
                    available 
                        ? 
                    <h3>{products.length ? 'Товары в магазине' : 'Нет товаров для оформления'}</h3> 
                        : 
                    products.length
                        ?
                    <h3>
                        <span>
                            {count} {count === 1 ? 'товар недоступен' : (count >= 5 || count === 0) ? 'товаров недоступны' : 'товара недоступны'} для оформления.
                        </span>
                        <span className={classes.sign}>
                            {count === 1 ? 'Он останется' : 'Они останутся'} в корзине. Вы сможете купить {count === 1 ? 'его' : 'их'} в других магазинах.
                        </span>
                    </h3>
                        :
                    <></>
                        :
                    <></>
                }
            <ListCountsShop products={products} />
        </section>
    )
}