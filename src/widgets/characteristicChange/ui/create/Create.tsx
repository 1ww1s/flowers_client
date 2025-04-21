import { FC } from "react";
import classes from './create.module.scss'
import { Change } from "../change/Change";

interface IProps{
    setOpen: (open: boolean) => void;
}

export const Create: FC<IProps> = ({setOpen}) => {

    return (
        <section className={classes.content}>
            <h2>Создать характеристику</h2>
            <Change setOpen={setOpen} />            
        </section>
    )
}