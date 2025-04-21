// import { FullscreenControl, Map, Panorama, Placemark, useYMaps, YMaps } from "@pbe/react-yandex-maps";
// import { FC, useState } from "react";
// import styled from "styled-components";
// import { IGeocodeResult, panorama } from "yandex-maps";
// import { IShop } from "../../../../entities/shop";
// import classes from './newMap.module.scss'

// type CoordinatesType = Array<number>

// interface IMapClickEvent {
//     get: (key: string) => CoordinatesType;
// }

// interface IAdderss {
//     location: string;
//     route: string;
// }

// const MapStyled = styled(Map)`
//     width: 70%;
//     height: 550px;
// `;

// const CENTER = [59.940770, 30.311970]
// const ZOOM = 12;

// interface IProps {
//     shops: IShop[];
// }

// export const NewMap: FC<IProps> = ({shops}) => {

//     const [coordinates, setCoordinates] = useState<CoordinatesType | null>(null)
//     const [adderss, setAddress] = useState<IAdderss | null>(null)
//     const [hasPanorama, setHasPanorama] = useState<boolean>(false)

//     const ymaps = useYMaps(['geocode'])

//     const handleCLickMap = (e: IMapClickEvent) => {
//         const coords = e.get("coords")

//         if(coords){
//             setCoordinates(coords)
//         }

//         ymaps?.panorama
//             .locate(coords)
//             .then((panorama) => {
//                 setHasPanorama(!!panorama.length)
//             })
//             .catch(e => {
//                 console.log('Ошибка при поиске панорамы', e)
//                 setHasPanorama(false)
//             })


//         ymaps
//             ?.geocode(coords)
//             .then(result => {
//                 const foundAdderss = handleGeoResult(result)
//                 if(foundAdderss){
//                     setAddress(foundAdderss)
//                 }
//                 console.log("handleGeoResult", handleGeoResult(result))
//             })
//             .catch((e: any) => {
//                 console.log('Ошибка геокодирования', e)
//                 setAddress(null)
//             })

//         function handleGeoResult(result: IGeocodeResult){
//             const firstGeoObject = result.geoObjects.get(0);

//             if(firstGeoObject){
//                 const properties = firstGeoObject.properties;

//                 const location = String(properties.get("description", {}));
//                 const route = String(properties.get("name", {}));

//                 const foundAddress = {
//                     location,
//                     route,
//                 }

//                 return foundAddress
//             }
//         }

//         console.log('click map', e.get('coords'))
//     }

//     return (
//         <section className={classes.wrap}>
//             <section className={classes.data}>
//                 {adderss && <p>{adderss.route}</p>}
//                 {coordinates && <p>{coordinates.map(c => c.toFixed(6)).join(' ')}</p>}
//                 {hasPanorama && coordinates ? <Panorama key={coordinates?.join(',')} width={'100%'} height={'200px'} defaultPoint={coordinates || []} /> : <h3>Нет парнорамы</h3>}
//             </section>
//             <MapStyled 
//                 defaultState={{
//                     center: CENTER, 
//                     zoom: ZOOM,
//                 }} 
//                 onClick={(e: IMapClickEvent) => handleCLickMap(e)}
//             >
//                 {shops.map(shop => 
//                     <Placemark geometry={[shop.coordinateX, shop.coordinateY]} />
//                 )}

//                 { coordinates && <Placemark geometry={coordinates} /> }
            
//             </MapStyled>
//         </section>
//     )
// }