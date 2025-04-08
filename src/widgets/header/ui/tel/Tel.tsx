import { FC } from "react";
import classes from './tel.module.scss'
import tel from '../../lib/assets/Phone-call.png'


export const Tel: FC = () => {

    return (
        <figure className={classes.tel}>
            <img src={tel} />
            <figcaption>+7 952 094-91-16</figcaption>
        </figure>
    )

}