import { FC } from "react";
import { Change } from "../change/Change";
import classes from './create.module.scss'


interface IProps {
    setOpen: (open: boolean) => void;
}


export const Create: FC<IProps> = ({setOpen}) => {


    return (
        <section className={classes.shopCreate}>
            <h2>Добавить магазин</h2>
            <Change setOpen={setOpen} />
        </section>
    )
}