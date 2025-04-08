import { Panorama } from "@pbe/react-yandex-maps";
import { FC } from "react";

interface IProps {
    coords: [number, number]
}

export const Data: FC<IProps> = ({coords}) => {
    return (
            <Panorama 
                width={'100%'}
                height={'100%'}
                defaultPoint={coords}
            />
    )
}