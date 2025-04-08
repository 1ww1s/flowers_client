import { FC } from "react";
import { ShopChange } from "../../../../features/shopChange";
import classes from './change.module.scss'
import { ShopSend } from "../../../../features/shopSend";

interface IProps {
    setOpen: (open: boolean) => void;
}


export const Change: FC<IProps> = ({setOpen}) => {


    return (
        <section className={classes.change}>
            <ShopChange />
            <ShopSend setOpen={setOpen} />
        </section>
    )
}