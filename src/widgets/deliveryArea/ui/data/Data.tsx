import { FC } from "react";

import classes from './data.module.scss'
import { ItemData, Warning } from "../../../../shared";
import { IZone } from "../../../../entities/order";

interface IProps {
    zone: IZone | null;
    error: string;
}

export const Data: FC<IProps> = ({zone, error}) => {

    return (
        <section className={classes.data}>
            {
                zone
                    ?
                <section className={classes.content}>
                    <ItemData 
                        items={[
                            {
                                sign: "Назавание",
                                data: String(zone.title)
                            },
                            {
                                sign: "Стоимость",
                                data: String(zone.price)
                            }
                        ]}
                    />
                </section>
                    :
                error
                    ?
                <Warning title={error} />
                    :
                <p>Выберите зону на карте, чтобы узнать стоимость доставки</p>
            }
        </section>
    )
}