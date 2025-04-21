import { FC } from "react";
import classes from './orderPreview.module.scss'
import { ItemDataLoader, LoaderDiv } from "../../../../shared";

interface IProps {
    isLoading: boolean;
    numbItems: number;
}

export const OrderPreviewLoader: FC<IProps> = ({isLoading, numbItems}) => {


    return (
        <section className={classes.orderPreview}>
            <section className={classes.header}>
                <section className={classes.loader}><LoaderDiv /></section>
            </section>
            <section className={classes.details}>
                <section className={classes.data}>
                    <ItemDataLoader numbItems={numbItems} isLoading={isLoading} />           
                </section>
                <section className={classes.products}>
                    <span className={classes.title}> 
                        <section className={classes.loader}><LoaderDiv /></section>
                    </span>
                </section>
            </section>
        </section>
    )
}