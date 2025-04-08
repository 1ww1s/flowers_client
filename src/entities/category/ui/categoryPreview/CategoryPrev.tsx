import { FC } from "react";
import { ICategory } from "../../model/types";
import classes from './categoryPrev.module.scss'
import { Link } from "react-router-dom";

interface IProps{
    category: ICategory;
}


export const CategoryPrev: FC<IProps> = ({category}) => {



    return (
        <section className={classes.categoryPrev}>
            <Link className={classes.link} to={`/catalog/${category.slug}`}>
                <figure className={classes.box}>
                    <img className={classes.img} src={category.image} />
                    <section className={classes.signBox}>
                        <section className={classes.sign}>
                            <h3>{category.name.toUpperCase()}</h3>
                        </section>
                        <section className={classes.darken}></section>
                    </section>
                </figure>
            </Link>
        </section>
    )
}