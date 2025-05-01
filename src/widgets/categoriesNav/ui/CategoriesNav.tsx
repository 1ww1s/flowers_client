import { FC, useEffect } from "react";
import { ICategories, NavByCategories, NavByCategoriesLoader, useCategoryActions } from "../../../entities/category";
import { useAppSelector } from "../../../app/store/store";
import { useParams } from "react-router-dom";

export const CategoriesNav: FC = () => {

    const {isLoading, categories} = useAppSelector(s => s.CategoriesReducer)
    const {setName, setError} = useCategoryActions()
    const params = useParams<{category: string}>()

    const setCategory = (categories: ICategories['data']) => {
        const thisCategory = categories.find(c => c.slug === params.category)
        if(thisCategory){
            setName(thisCategory.name)
            setError('')
        }
        else{
            setName('')
            setError('404')
        }
    }

    useEffect(() => {
        if(categories.loaded){
            setCategory(categories.data)
        }
    }, [params.category, categories.loaded])

    return (
        isLoading
            ?
        <NavByCategoriesLoader />
            :
        <NavByCategories />
    )
}