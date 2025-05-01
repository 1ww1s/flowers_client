import { FC, useEffect } from "react";
import classes from './navByCategories.module.scss'
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../../app/store/store";


export const NavByCategories: FC = () => {

    const params = useParams<{category: string}>()
    const {categories} = useAppSelector(s => s.CategoriesReducer)

    return (
        <section className={classes.nav}>
            <ul>
                {categories.data.map((category, ind) =>
                    <li key={ind}>
                        <Link 
                            className={category.slug === params.category ? classes.selected : ''}         
                            to={`${process.env.REACT_APP_CLIENT_URL}/catalog/${category.slug}`}
                        >
                            {category.name}
                        </Link>
                        <span>{category.name}</span>
                    </li>
                )}
            </ul>
        </section>
    )
}