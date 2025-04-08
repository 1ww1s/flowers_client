import { FC, useEffect, useState } from "react";
import { CategoryInitialState, CategoryPrev, CategoryPrevLoader, categoryService, ICategory } from "../../../../entities/category";
import classes from './categories.module.scss'




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