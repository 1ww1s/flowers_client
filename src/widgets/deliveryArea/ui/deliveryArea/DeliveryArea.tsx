import { FC, useState } from "react";
import classes from './deliveryArea.module.scss'
import { YMaps } from "@pbe/react-yandex-maps";
import { MapWrap } from "../map/Map";
import { Data } from "../data/Data";
import { IZone } from "../../../../entities/order";




export const DeliveryArea: FC = () => {

    const [price, setPrice] = useState<number>(0)
    const [selectedZone, setSelectedZone] = useState<IZone | null>(null)
    const [error, setError] = useState<string>('')

    return (
        <section className={classes.deliveryArea}>
            <Data zone={selectedZone} error={error} />
            <YMaps query={{apikey: '5232156a-499a-4991-94f5-87306751113a'}}>
                <MapWrap setError={setError} setSelectedZone={setSelectedZone} />
            </YMaps>
        </section>
    )
}