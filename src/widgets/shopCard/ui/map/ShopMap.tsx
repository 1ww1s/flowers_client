import { Map, Placemark } from "@pbe/react-yandex-maps";
import { FC } from "react";
import { IShop } from "../../../../entities/shop";


interface IProps {
    shop: IShop;
    onLoad: () => void;
    onError: (e: Error) => void;
}


export const ShopMap: FC<IProps> = ({shop, onLoad, onError}) => {

    const center = [shop.coordinateX, shop.coordinateY]
    const zoom = 15;

    return (
        <Map
            width={'100%'}
            height={'100%'}
            state={{
                center, 
                zoom
            }}
            onLoad={onLoad}
            onError={onError}
        >
            <Placemark
                geometry={center}
            />
        </Map>
    )
}