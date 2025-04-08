import { FC } from "react";
import classes from './group.module.scss'

interface IProps {
    sign: string;
    data: string;
}

export const GroupData: FC<IProps> = ({sign, data}) => {


    return (
            <section className={classes.inf}>
                <section data-cancel_click className={classes.group}>
                    <label className={classes.title}>{sign}</label>
                    <span className={classes.value}>{data}</span>
                </section>
            </section>
    )
}