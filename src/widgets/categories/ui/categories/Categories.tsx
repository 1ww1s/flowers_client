import { FC, useEffect, useState } from "react";
import { CategoryInitialState, CategoryPrev, CategoryPrevLoader, categoryService, ICategory } from "../../../../entities/category";
import classes from './categories.module.scss'
import { Helmet } from "react-helmet-async";




export const Categories: FC = () => {

    const [categories, setCategories] = useState<ICategory[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getCategories = async () => {
        try{
            setIsLoading(true)
            const data = await categoryService.getAll()
            setCategories(data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }    
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <section className={classes.categories}>
            <Helmet>
                <title>Каталог</title>
                <meta name="description" content={`Наша продукция представлена в следующий категориях: ${categories.map(d => d.name).join(', ')}`} />
                <meta property="og:title" content='Каталог' />
                <meta property="og:description" content={`Наша продукция представлена в следующий категориях: ${categories.map(d => d.name).join(', ')}`}/>
            </Helmet>
            <section className={classes.data}>
                {
                    isLoading
                        ?
                    <CategoryPrevLoader numbItems={8} />
                        :
                    categories.map((category, ind) => 
                        <CategoryPrev key={ind} category={category} />
                    )
                }
            </section>
        </section>
    )
}