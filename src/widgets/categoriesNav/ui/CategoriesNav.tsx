import { FC } from "react";
import { NavByCategories, NavByCategoriesLoader } from "../../../entities/category";
import { useAppSelector } from "../../../app/store/store";

export const CategoriesNav: FC = () => {

    const {isLoading, categories} = useAppSelector(s => s.CategoriesReducer)

    return (
        isLoading
            ?
        <NavByCategoriesLoader />
            :
        <NavByCategories categories={categories.data} />
    )
}