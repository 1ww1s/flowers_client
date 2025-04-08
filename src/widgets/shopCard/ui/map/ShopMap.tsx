import { Map, Placemark } from "@pbe/react-yandex-maps";
import { FC } from "react";
import { IShop } from "../../../../entities/shop";


interface IProps {
    shop: IShop;
}


export const ShopMap: FC<IProps> = ({shop}) => {

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
        >
            <Placemark
                geometry={center}
            />
        </Map>
    )
}