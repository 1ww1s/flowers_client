import { FC, useEffect } from "react";
import classes from './navByCategories.module.scss'
import { Link, useLocation, useParams } from "react-router-dom";
import { useCategoryActions } from "../../../lib/hooks/useCategoryActions";


interface IProps{
    categories: {name: string, slug: string}[]
}

export const NavByCategories: FC<IProps> = ({categories}) => {

    const params = useParams<{category: string}>()
    const {setName, setError} = useCategoryActions()

    useEffect(() => {
        const thisCategory = categories.find(c => c.slug === params.category)
        if(thisCategory){
            setName(thisCategory.name)
        }
        else{
            setError('404')
        }
    }, [params.category])

    return (
        <section className={classes.nav}>
            <ul>
                {categories.map((category, ind) =>
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