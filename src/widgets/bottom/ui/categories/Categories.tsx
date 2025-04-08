import { FC } from "react";
import classes from './categories.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { LoaderDiv } from "../../../../shared";
import { Link } from "react-router-dom";
import { List } from "../list/List";


export const Categories: FC = () => {

    const {categories, isLoading} = useAppSelector(s => s.CategoriesReducer)

    return (
        <section className={classes.categories}>
            <h3>Наши товары</h3>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderDiv /></section>
                    :
                <List
                    childrens={                        
                        categories.data.map(category => 
                            <Link key={category.name} className={classes.link} to={'catalog/'+category.slug}>
                                {category.name}
                            </Link>
                        )
                    }
                />
                // <ul className={classes.list}>
                // {
                //     categories.data.map(category => 
                //         <li className={classes.item}>
                //             <Link className={classes.link} to={'catalog/'+category.slug}>
                //                 {category.name}
                //             </Link>
                //         </li>
                //     )
                // }
                // </ul>
            }
        </section>
    )
}