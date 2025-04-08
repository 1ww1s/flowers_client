import { FC } from "react";
import classes from './listCountsShop.module.scss'

interface IProps {
    products: {count: number, image: string}[];
}

export const ListCountsShop: FC<IProps> = ({products}) => {

    return (
        <section className={classes.wrap}>
            <ul className={classes.list}>
                {products.map((product, ind) => 
                    <li className={classes.item} key={ind}> 
                        <img className={classes.image} src={product.image} alt='Продукт' />
                        <span className={classes.count}>x{product.count}</span>
                    </li>
                )}
            </ul>
        </section>
    )
}