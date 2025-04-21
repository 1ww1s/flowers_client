import { FC } from "react";
import { IProduct } from "../../model/types";
import { Description } from "../description/Description";
import classes from './productShopsCard.module.scss'

interface IProps {
    shops: IProduct['shops']
}

export const ProductShopsCard: FC<IProps> = ({shops}) => {

    return (
        <section className={classes.shops}>
        {
            shops.length === 0
                ?
            <p>Нет в наличии</p>
                :
            <>
                <section className={classes.desctop}>
                    {
                        shops.map((shop, ind) => 
                            <Description key={ind} name={shop.address} values={[shop.count === '0' ? 'нет в наличии' : shop.count + 'шт']} />
                        )
                    }
                </section>
                <section className={classes.mobile}>
                    {
                        shops.map((shop, ind) => 
                            <section key={ind} className={classes.shop}>
                                <span>{shop.address}</span>
                                <span className={classes.count}>{shop.count === '0' ? 'нет в наличии' : shop.count + 'шт'}</span>
                            </section>
                        )
                    }
                </section>
            </>
            
        }
        </section>
    )
}