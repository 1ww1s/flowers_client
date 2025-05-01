import classes from './layout.module.scss'
import { CategoriesNav } from "../../../widgets/categoriesNav";
import { Outlet } from "react-router-dom";


export default function CategoryLayout() {

    return (
        <section className={classes.category}>
            <section className={classes.wrapper}>
                <section className={classes.navCategory}>
                    <CategoriesNav />
                </section>
                <section className={classes.content}>
                    <Outlet />
                </section>
            </section>
        </section>
    )
}