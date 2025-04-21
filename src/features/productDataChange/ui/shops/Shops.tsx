import { FC } from "react";
import { MyButtonMin } from "../../../../shared";
import { useAppSelector } from "../../../../app/store/store";
import { useProductActions } from "../../../../entities/product";
import classes from './shops.module.scss'
import { Shop } from "../shop/Shop";



export const Shops: FC = () => {

    const {product} = useAppSelector(s => s.ProductReducer)
    const {setShops} = useProductActions()

    const addShop = () => {
        setShops([...product.shops, {address: '', count: '', openingHours: '', title: ''}])
    } 
    
    return (
        <section className={classes.shops}>
            <h2>Наличия в магазинах</h2>
            <section className={classes.content}>
            {
                product.shops.map((_, ind) => 
                    <Shop key={ind} ind={ind} />
                )
            }
            </section>
            <section className={classes.button}>
                <MyButtonMin 
                    onClick={addShop} 
                    isLoading={false}
                >
                    Добавить магазин
                
                </MyButtonMin>
            </section>
        </section>
    )
}