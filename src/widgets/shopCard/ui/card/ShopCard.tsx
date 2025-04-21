import { FC, useState } from "react";
import { IShop } from "../../../../entities/shop";
import classes from './card.module.scss'
import { ItemData, LoaderScreen } from "../../../../shared";
import { useYMaps, YMaps } from "@pbe/react-yandex-maps";
import { ShopMap } from "../map/ShopMap";
import { Data } from "../data/Data";

interface IProps {
    shop: IShop;
}


export const ShopCard: FC<IProps> = ({shop}) => {

    const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true)
    const [isLoadingPanorama, setIsLoadingPanorama] = useState<boolean>(true)

    const handleMapReady = () => {
        setIsLoadingMap(false)
    }

    const handleMapError = (e: Error) => {
        setIsLoadingMap(false)
    }

    const handlePanoramaReady = () => {
        setIsLoadingPanorama(false)
    }

    const handlePanoramaError = (e: Error) => {
        setIsLoadingPanorama(false)
    }

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
                                    {
                                        isLoadingMap
                                            &&
                                        <LoaderScreen full={false} />
                                    }
                                    <ShopMap 
                                        shop={shop} 
                                        onLoad={handleMapReady}
                                        onError={handleMapError}
                                    />
                                </section>
                                <h2 className={classes.h2Panorama}>На панораме</h2>
                                <section className={classes.data}>
                                    {
                                        isLoadingPanorama
                                            &&
                                        <LoaderScreen full={false} />
                                    }
                                    <Data 
                                        coords={[shop.coordinateX, shop.coordinateY]} 
                                        onLoad={handlePanoramaReady}
                                        onError={handlePanoramaError}
                                    />
                                </section>
                        </section>
                    </section>
                </YMaps>
        </section>
    )
}