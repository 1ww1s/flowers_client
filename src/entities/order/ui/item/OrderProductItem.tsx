import { FC, PropsWithChildren } from "react";
import classes from './orderProductItem.module.scss'
import { IOrderRes } from "../../model/types";
import rub from '../../../../shared/lib/assets/icon/Rub.png'
import { Link } from "react-router-dom";

interface IProps {
    admin?: boolean;
    products: IOrderRes['products']
}

export const OrderProductItem: FC<IProps & PropsWithChildren> = ({products, admin=true, children}) => {

    return (
        <ul className={classes.list}>
            {products.map(product => 
                <li 
                    key={product.name}
                    className={classes.item}
                >
                    <Link to={`/catalog/${product.categorySlug}/${product.slug}`} className={classes.image}>
                        <img src={product.image} />
                    </Link>
                    <section className={classes.data}>
                        <section className={classes.idBox + (admin ? (' ' + classes.active) : '')}>id <span className={classes.id}>{product.id}</span></section>
                        <section className={classes.price}>{product.price} <img src={rub} /></section>
                        <section className={classes.name}>{product.name}</section>
                    </section>
                    <section className={classes.count}>
                        {product.count} шт.
                    </section>
                </li>
            )}
        </ul>
    )
}