import { FC, useState } from "react";
import { ProductSend } from "../../../../features/productSend";
import { Composition } from "../composition/Composition";
import { Characteristics } from "../characteristics/Characteristics";
import { Images } from "../images/Images";
import { ProductData } from "../productData/ProductData";
import classes from './change.module.scss'


interface IProps{
    setOpen: (open: boolean) => void;
}

export const Change: FC<IProps> = ({setOpen}) => {


    return (
        <section className={classes.content}>
            <ProductData />
            <Images  />
            <Characteristics />
            <Composition />
            <ProductSend setOpen={setOpen}/>
        </section>
    )
}