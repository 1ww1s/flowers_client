import { FC, useState } from "react";
import { Map, Placemark, Polygon } from "@pbe/react-yandex-maps";
import { IZone, zones } from "../../../../entities/order";

interface IProps {
    setSelectedZone: (zone: IZone | null) => void;
    setError: (error: string) => void;
}

const center = [56.858745, 35.917421]
const zoom = 11;


type CoordinatesType = [number, number]

interface IMapClickEvent {
    get: (key: string) => CoordinatesType;
}


export const MapWrap: FC<IProps> = ({setSelectedZone, setError}) => {

    const [coords, setCoords] = useState<[number, number] | null>(null)

    // const isPointInPolygon = (point: [number, number], polygon: IZone['coords']) => {
    //     const x = point[0];
    //     const y = point[1];
    //     let inside = false;
        
    //     for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++){
    //         const xi = polygon[i][0];
    //         const yi = polygon[i][1];
    //         const xj = polygon[j][0];
    //         const yj = polygon[j][1];
            
    //         const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    //         if(intersect) inside = !inside;
    //     }

    //     return inside
    // }

    const handleClick = (e: IMapClickEvent, zone: IZone) => {
        const coords = e.get("coords") 
        setCoords(coords)
        setSelectedZone(zone)
    }

    const handleClickMap = (e: IMapClickEvent) => {
        const coords = e.get("coords") 
        setCoords(coords)
        setSelectedZone(null)
        setError('В данную точку доставка невозможна')
    }


    return (
        <Map 
            state={{
                center,
                zoom
            }}
            onClick={handleClickMap}
            width={'100%'} 
            height={'500px'}
        >
            {zones.map((zone, ind) => 
                <Polygon
                    onClick={(e: IMapClickEvent) => handleClick(e, zone)}
                    key={ind}
                    geometry={[zone.coords]}
                    options={{
                        zIndex: zones.length - ind,
                        fillColor: zone.color.value,
                        strokeColor: '#0000FF',
                        opacity: 0.5,
                        interactivityModel: 'default#layer',
                    }}
                />
            )}
            {
                coords
                    &&
                <Placemark 
                    geometry={coords}
                />
            }
        </Map>
    )
}