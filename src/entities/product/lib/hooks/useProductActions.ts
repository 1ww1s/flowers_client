import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { ProductSlice } from "../../model/reducers/ProductSlice"


export const useProductActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(ProductSlice.actions, dispatch)
}