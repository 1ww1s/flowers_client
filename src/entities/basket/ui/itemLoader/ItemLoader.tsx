import { FC } from "react";
import classes from './itemLoader.module.scss'
import { LoaderSpinner } from "../../../../shared";


export const ItemLoader: FC = () => {

    return (
        <section className={classes.outOfStock}>
            <LoaderSpinner style={{background: 'white'}} />
        </section>
    )
}