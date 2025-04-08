import { FC, useState } from "react";
import { Change } from "../change/Change";
import classes from './create.module.scss'

interface IProps {
    setOpen: (open: boolean) => void;
}

export const Create: FC<IProps> = ({setOpen}) => {
    

    return(
        <section className={classes.content}>
            <h2>Создать товар</h2>
            <Change setOpen={setOpen} />
        </section>
    )
}