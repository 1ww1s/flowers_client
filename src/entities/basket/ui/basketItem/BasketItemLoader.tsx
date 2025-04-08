import { FC } from "react";
import classes from './basketItem.module.scss'
import { LoaderDiv } from "../../../../shared";

interface IProps {
    numb: number;
}

export const BasketItemLoader: FC<IProps> = ({numb}) => {

    const mas = []
    for(let i = 0; i < numb; i++){
        mas.push(i)
    }

    return (
        mas.map(m => 
            <section key={m + 1} className={classes.item}>
                <section className={classes.loader}><LoaderDiv /></section>
            </section>
        )
    )
}