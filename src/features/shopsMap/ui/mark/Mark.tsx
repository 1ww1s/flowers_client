import React, { PropsWithChildren, useState } from "react";
import { GoToTheShop, IShop, IShopData } from "../../../../entities/shop";
import { Placemark } from "@pbe/react-yandex-maps";
import logo from '../../lib/logoMain.png'
import ReactDOMServer from 'react-dom/server'
import { ShopsCard } from "../card/ShopCard";
import { Portal } from "../portal/Portal";

interface BalloonContentProps {
    shop: IShop;
    choice?: {selectedShop: IShopData | null; setSelectedShop: (shop: IShop) => void};
} 

export const Mark: React.FC<BalloonContentProps & PropsWithChildren> = ({shop, choice}) => {

    const renderComponentToString = (component: React.ReactElement) => {
        return ReactDOMServer.renderToString(component);
    };

    const [ activePortal, setActivePortal ] = useState(false)

    const handleBalloonOpen = (event: any) => {
        setTimeout(() => setActivePortal(true), 0)
    }

    const handleBalloonClose = (event: any) => {
        setTimeout(() => setActivePortal(false), 0)
    }

    const onClick = () => {
        if(choice){
            choice.setSelectedShop(shop)
        }
    }

    return (
        <>
        <Placemark
            geometry={[shop.coordinateX, shop.coordinateY]}
            onClick={onClick}
            properties={{
                balloonContent: choice ? "" : renderComponentToString(<ShopsCard shop={shop} />)
            }}
            options={{
                iconLayout: 'default#image',
                iconImageHref: logo,
                iconImageSize: [(choice?.selectedShop?.id === shop.id) ? 45 : 30, (choice?.selectedShop?.id === shop.id) ? 45 : 30],
            }}
            onBalloonOpen={handleBalloonOpen}
            onBalloonClose={handleBalloonClose}

            modules= {
                ['geoObject.addon.balloon']
            }
        />
        {
        !choice
            &&
        activePortal 
            && 
        <Portal elementId="balloonActive">
            <GoToTheShop to={shop.titleSlug} />
        </Portal>
        }
        </>
    );
};
