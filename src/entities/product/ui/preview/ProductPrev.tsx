import React, { FC, MouseEvent } from "react";
import { IProductPreview } from "../../model/types";
import classes from './productPrev.module.scss'
import rub from '../../../../shared/lib/assets/icon/Rub.png'
import { Link, useNavigate } from "react-router-dom";
import { getFormatPrice } from "../../lib/hooks/getFormatPrice";

interface IProps{
    product: IProductPreview;
    buttonBasket: React.ReactElement;
    buttonFavourites: React.ReactElement;
}


export const ProductPrev: FC<IProps> = ({product, buttonBasket, buttonFavourites}) => {

    const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const cancelClick = Boolean(target.closest('[data-cancel_click="true"]'))
        if(cancelClick)
            e.preventDefault()
    }

    return (
        <Link className={classes.link} onClick={e => onClick(e)} to={product.slug}>
            <section className={classes.productPrev}>
                <section className={classes.img}>
                    <img src={product.image} />
                </section>
                <section className={classes.wrapper}>
                    <section className={classes.data}>
                        <section className={classes.price}>
                            {getFormatPrice(product.price)}
                            <img src={rub} />
                        </section>
                        <section className={classes.name}>
                            {product.name}
                        </section>
                    </section>
                        
                    <section data-cancel_click="true" className={classes.features}>
                        <section className={classes.buttonBasket}>
                            {buttonBasket}
                        </section>
                        <section className={classes.buttonFavourites}>
                            {buttonFavourites}
                        </section>
                    </section>
                </section>
            </section>
        
        </Link>
    )
}