import { FC } from "react";
import { IShop } from "../../../../entities/shop";
import classes from './card.module.scss'
import { ItemData } from "../../../../shared";
import { YMaps } from "@pbe/react-yandex-maps";
import { ShopMap } from "../map/ShopMap";
import { Data } from "../data/Data";

interface IProps {
    shop: IShop;
}


export const ShopCard: FC<IProps> = ({shop}) => {


    return (
        <section className={classes.card}>
            <h1>{shop.title}</h1>
            <h2>О магазине</h2>
            <ItemData 
                items={[
                    {
                        sign: 'Адрес',
                        data: shop.address
                    },
                    {
                        sign: 'Часы работы',
                        data: shop.openingHours
                    }
                ]}
            />
                <YMaps query={{apikey: '5232156a-499a-4991-94f5-87306751113a'}}>
                    <section className={classes.mapWrap}>
                        <h2>На карте</h2>
                        <section className={classes.content}>
                            <section className={classes.map}>
                                <ShopMap shop={shop} />
                            </section>
                            <section className={classes.data}>
                                <Data coords={[shop.coordinateX, shop.coordinateY]} />
                            </section>
                        </section>
                    </section>
                </YMaps>
        </section>
    )
}