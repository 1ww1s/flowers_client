



import { FC } from "react";
import classes from '../navByCategories/navByCategories.module.scss'
import { LoaderDiv } from "../../../../../shared";


export const NavByCategoriesLoader: FC = () => {

    

    return (
        <section className={classes.nav}>
            <section className={classes.loader}>
                <LoaderDiv />
            </section>
        </section>
    )
}