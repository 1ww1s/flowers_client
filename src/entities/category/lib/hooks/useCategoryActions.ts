import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../../app/store/store"
import { CategorySlice } from "../../model/reducers/category/CategorySlice";




export const useCategoryActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(CategorySlice.actions, dispatch)
}