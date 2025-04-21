import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { CharacteristicSlice } from "../../model/reducers/CharacteristicSlice"



export const useCharacteristicActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(CharacteristicSlice.actions, dispatch)
}