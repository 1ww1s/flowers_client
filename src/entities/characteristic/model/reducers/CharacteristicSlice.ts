import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacteristicInitialState } from "./InitialState";
import { ICharacteristic } from "../types";







export const CharacteristicSlice = createSlice({
    name: 'characteristic',
    initialState: CharacteristicInitialState,
    reducers: {
        setCharacteristic(state, action: PayloadAction<ICharacteristic>){
            state.characteristic = action.payload;
        },
        setName(state, acton: PayloadAction<string>){
            state.characteristic.name = acton.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
    }
})

export const CharacteristicReducer = CharacteristicSlice.reducer;