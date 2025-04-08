import { FC } from "react";
import classes from './composition.module.scss'
import { CompositionChange } from "../../../../features/compositionChange";


export const Composition: FC = () => {


    return (
        <section className={classes.composition}>
            <h2>Состав</h2>
            <CompositionChange />
        </section>
    )
}