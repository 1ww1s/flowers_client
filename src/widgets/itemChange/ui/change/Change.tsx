import { FC } from "react";
import classes from './change.module.scss'
import { ItemChange } from "../../../../features/itemChange";
import { ItemSend } from "../../../../features/ItemSend";

interface IProps {
    setOpen: (open: boolean) => void;
}

export const Change: FC<IProps> = ({setOpen}) => {

    return (
        <section className={classes.change}>
            <ItemChange />
            <section className={classes.button}>
                <ItemSend 
                    setOpen={setOpen}
                />

            </section>
        </section>
    )
}