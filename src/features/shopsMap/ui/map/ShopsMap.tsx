import React from "react";
import { IShop, IShopData } from "../../../../entities/shop";
import { Mark } from "../mark/Mark";
import { MapStateCenter } from "react-yandex-maps";
import { Clusterer, FullscreenControl, GeolocationControl, Map, RouteButton, ZoomControl } from "@pbe/react-yandex-maps";
import { IMapState } from "yandex-maps";

interface BalloonContentProps {
    shops: IShop[];
    choice?: {selectedShop: IShopData | null; setSelectedShop: (shop: IShop) => void};
}

const mapState: MapStateCenter & IMapState = {
    center: [56.858745, 35.917421],
    zoom: 12,
}

export const ShopsMap: React.FC<BalloonContentProps> = ({shops, choice}) => {

    return (
        <Map height={"100%"} width={'100%'} state={mapState}>
            <Clusterer>
            {
                shops.map((shop, ind) => 
                    <Mark key={ind} shop={shop} choice={choice} />
                )
            }
            </Clusterer>
            {!choice && <FullscreenControl />}
            <GeolocationControl />
            <RouteButton />
            <ZoomControl />
        </Map>
    );
};
