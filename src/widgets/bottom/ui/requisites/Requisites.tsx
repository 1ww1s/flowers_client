import { FC } from "react";
import classes from './requisites.module.scss'
import { List } from "../list/List";


export const Requisites: FC = () => {

    const data = [
        'ИП: Калашников Павел Сергеевич',
        'Расчетный счет: 40802810632250001191',
        'ИНН: 781102520000',
    ]

    return (
        <section className={classes.requisites}>
            <h3>Наши реквизиты</h3>
            <List 
                childrens={data.map(d => <>{d}</>)}
            />
        </section>
    )
}