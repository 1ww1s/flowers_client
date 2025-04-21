import { FC, useState } from "react";
import { BasketItem, IBasket } from "../../../../entities/basket";
import { ChangeProductCountInBasket } from "../../../../features/changeProductCountInBasket";
import { DeleteProductFromBasket } from "../../../../features/deleteProductFromBasket";
import { getFormatPrice } from "../../../../entities/product";
import classes from './item.module.scss'
import { ProductToFavorites } from "../../../../features/productToFavorites";

interface IProps {
    ind: number;
    product: (IBasket & {countMax: number;})
    setCount: (ind: number, count: number) => void;
    deleteCount: () => void;
}

export const Item: FC<IProps> = ({ind, product, setCount, deleteCount}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    
    return (
        <section className={classes.item}>
            <BasketItem isLoading={isLoading} key={ind} item={product} getForamtPrice={getFormatPrice}>
                <section className={classes.features}>
                    {
                        product.countMax === 0
                            ?
                        <section className={classes.outStock}>Нет в наличии</section>
                            :
                        <ChangeProductCountInBasket
                            setIsLoading={setIsLoading}
                            maxCount={product.countMax}
                            ind={ind}
                            count={product.count} 
                            setCount={c => setCount(ind, c)} 
                        />
                    }
                    <section className={classes.bottom}>
                        <ProductToFavorites productId={`${product.id}`} />
                        <DeleteProductFromBasket
                            deleteCount={deleteCount}
                            productId={product.id} 
                            setIsLoading={setIsLoading} 
                        />
                    </section>
                </section>    
            </BasketItem>
        </section>
    )
}