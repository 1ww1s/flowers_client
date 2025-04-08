import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { UserSlice } from "../../model/reducers/UserSlice"


export const useUserAcions = function(){
    const dispatch = useAppDispatch()
    return bindActionCreators(UserSlice.actions, dispatch)
}