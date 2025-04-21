import { FC } from "react";
import classes from './change.module.scss'
import { CharacteristicChange } from "../../../../features/characteristicChange";
import { CharacteristicSend } from "../../../../features/characteristicSend";

interface IProps {
    setOpen: (open: boolean) => void;
}

export const Change: FC<IProps> = ({setOpen}) => {

    return (
        <section className={classes.change}>
            <CharacteristicChange />
            <section className={classes.button}>
                <CharacteristicSend 
                    setOpen={setOpen}
                />
            </section>
        </section>
    )
}