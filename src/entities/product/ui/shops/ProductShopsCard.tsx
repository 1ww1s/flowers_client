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
            {shops.map((shop, ind) => 
                <Description key={ind} name={shop.address} values={[shop.count + 'шт']} />
            )}
        </section>
    )
}