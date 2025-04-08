import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../../app/store/store"
import { CategoriesSlice } from "../../model/reducers/categories/CategoriesSlice";




export const useCategoriesActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(CategoriesSlice.actions, dispatch)
}