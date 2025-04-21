import React, { useState } from "react";
import { IShop, IShopData } from "../../../../entities/shop";
import { Mark } from "../mark/Mark";
import { MapStateCenter } from "react-yandex-maps";
import { Clusterer, FullscreenControl, GeolocationControl, Map, RouteButton, ZoomControl } from "@pbe/react-yandex-maps";
import { IMapState } from "yandex-maps";
import { LoaderScreen } from "../../../../shared";

interface BalloonContentProps {
    shops: IShop[];
    choice?: {selectedShop: IShopData | null; setSelectedShop: (shop: IShop) => void};
}

const mapState: MapStateCenter & IMapState = {
    center: [56.858745, 35.917421],
    zoom: 12,
}

export const ShopsMap: React.FC<BalloonContentProps> = ({shops, choice}) => {

    const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true)

    const handleMapReady = () => {
        setIsLoadingMap(false)
    }

    const handleMapError = (e: Error) => {
        setIsLoadingMap(false)
    }
    
    return (
        <>
        {
            isLoadingMap
                &&
            <LoaderScreen full={false} />
        }
        <Map 
            onLoad={handleMapReady}
            onError={handleMapError}
            height={"100%"} 
            width={'100%'} 
            state={mapState}
        >
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
        </>
    );
};
