import { FC, useEffect, useState } from "react";
import { Map, Placemark, Polygon } from "@pbe/react-yandex-maps";
import { IZone, orderService } from "../../../../entities/order";
import classes from './map.module.scss'
import { LoaderScreen } from "../../../../shared";

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
    const [zones, setZones] = useState<IZone[]>([])

    const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true)
    const [isLoadingZones, setIsLoadingZones] = useState<boolean>(true)

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

    const handleMapReady = () => {
        setIsLoadingMap(false)
    }

    const handleMapError = (e: Error) => {
        setIsLoadingMap(false)
    }

    const getZones = async () => {
        try{
            setIsLoadingZones(true)
            // await new Promise(resolve => setTimeout(resolve, 4000))
            const zones = await orderService.getZones()
            setZones(zones)
        }   
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoadingZones(false)
        }
    }

    useEffect(() => {
        getZones()
    }, [])
    
    return (
        <>
        {
            (isLoadingMap || isLoadingZones)
                &&
            <section className={classes.map}><LoaderScreen full={false} /></section>
        }
        <Map 
            onLoad={handleMapReady}
            onError={handleMapError}
            state={{
                center,
                zoom
            }}
            onClick={handleClickMap}
            className={classes.mapYandex + (isLoadingZones ? (' ' + classes.disabled) : '')}
        >
            {zones.map((zone, ind) => 
                <Polygon
                    onClick={(e: IMapClickEvent) => handleClick(e, zone)}
                    key={ind}
                    geometry={[zone.coords]}
                    options={{
                        zIndex: zones.length - ind,
                        fillColor: zone.color,
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
        </>
    )
}