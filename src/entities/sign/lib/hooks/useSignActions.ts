import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { SignSlice } from "../../model/reducers/SignSlice"


export const useSignActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(SignSlice.actions, dispatch)
}