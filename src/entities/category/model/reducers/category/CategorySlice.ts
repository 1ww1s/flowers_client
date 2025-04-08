import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryInitialState } from "./CategoryState";
import { ICategory } from "../../types";





export const CategorySlice = createSlice({
    name: 'category',
    initialState: CategoryInitialState,
    reducers: {
        setName(state, action: PayloadAction<string>){
            state.category.name = action.payload;
        },
        setImage(state, action: PayloadAction<string>){
            state.category.image = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setCategory(state, action: PayloadAction<ICategory>){
            state.category = action.payload;
        }
    }
})

export const CategoryReducer = CategorySlice.reducer;