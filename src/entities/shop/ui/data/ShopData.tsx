import { FC } from "react";
import classes from './shopData.module.scss'
import shopImg from '../../lib/assets/shop.png'

interface IProps {
    shop: {title: string, address: string, openingHours: string}
}

export const ShopData: FC<IProps> = ({shop}) => {


    return (
        <section className={classes.shopProducts}>
            <h3><img src={shopImg} />  Из магазина {shop.title}</h3>  { /* убрать img? */ }
            <p className={classes.address}>{shop.address}</p>
            <p className={classes.openingHours}>
                <svg viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 28.6481C22.6274 28.6481 28 23.2648 28 16.6241C28 9.98343 22.6274 4.6001 16 4.6001C9.37258 4.6001 4 9.98343 4 16.6241C4 23.2648 9.37258 28.6481 16 28.6481Z" strokeWidth="2" strokeMiterlimit="10"/>
                    <path d="M16 9.60999V16.624H23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {shop.openingHours}
            </p>
        </section>
    )
}