import { FC, MouseEvent } from "react";
import classes from './group.module.scss'
import { LoaderDiv } from "../../loaderDiv/LoaderDiv";

export const GroupDataLoader: FC = () => {


    return (
            <section className={classes.inf}>
                <section data-cancel_click className={classes.group}>
                    <label className={classes.title}>
                        <section className={classes.loader}><LoaderDiv /></section>
                    </label>
                    <span className={classes.value}>
                        <section className={classes.loader}><LoaderDiv /></section>
                    </span>
                </section>
            </section>
    )
}