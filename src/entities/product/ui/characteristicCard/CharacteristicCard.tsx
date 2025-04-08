import { FC } from "react";
import classes from './characteristicCard.module.scss'
import { IProduct } from "../../model/types";
import { Description } from "../description/Description";


interface IProps {
    characteristics: IProduct['characteristics']
}

export const CharacteristicCard: FC<IProps> = ({characteristics}) => {


    return (
        <section className={classes.characteristicCard}>
            {
                characteristics.map((c, i) => 
                    <Description key={i} name={c.name} values={c.values.map(v => v.value)} />
                )
            }
        </section>
    )
}