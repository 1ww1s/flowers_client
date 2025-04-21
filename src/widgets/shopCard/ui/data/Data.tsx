import { Panorama } from "@pbe/react-yandex-maps";
import { FC } from "react";

interface IProps {
    coords: [number, number];
    onLoad: () => void;
    onError: (e: Error) => void;
}

export const Data: FC<IProps> = ({coords, onError, onLoad}) => {

    

    return (
            <Panorama 
                width={'100%'}
                height={'100%'}
                defaultPoint={coords}
                onLoad={onLoad}
                onError={onError}
            />
    )
}