import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../../app/store/store";
import { ShopSlice } from "../../model/reducers/ShopSlice";




export function useShopActions(){
    const dispatch = useAppDispatch()
    return bindActionCreators(ShopSlice.actions, dispatch)
}