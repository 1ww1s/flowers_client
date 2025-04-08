import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { OrderSlice } from "../../model/reducers/OrderSlice"




export const useOrderActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(OrderSlice.actions, dispatch)
}