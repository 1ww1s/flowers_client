import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { BannerSlice } from "../../model/reducers/BannerSlice"



export const useBannerActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(BannerSlice.actions, dispatch)
}