import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { ItemSlice } from "../../model/reducers/ItemSlice"




export const useItemActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(ItemSlice.actions, dispatch)
}