import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemInitialState } from "./ItemState";
import { IItem } from "../types";






export const ItemSlice = createSlice({
    name: 'item',
    initialState: ItemInitialState,
    reducers: {
        setItem(state, action: PayloadAction<IItem>){
            state.item = action.payload;
        },
        setName(state, action: PayloadAction<string>){
            state.item.name = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
    }
})

export const ItemReducer = ItemSlice.reducer;