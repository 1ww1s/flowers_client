import { FC, useEffect } from "react";
import { Categories } from "../../widgets/categories";
import classes from './catalog.module.scss'



export default function Catalog(){
    


   

    return (
        <section className={classes.catalog}>
            <section className={classes.wrapper}>
                <h1>Каталог</h1>
                <Categories />  
            </section>
        </section>
    )
}