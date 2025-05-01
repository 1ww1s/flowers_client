import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesInitialState } from "./CategoriesState";



export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState: CategoriesInitialState,
    reducers: {
        setNames(state, action: PayloadAction<{id: number, name: string, slug: string}[]>){
            state.categories.data = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setLoaded(state, action: PayloadAction<boolean>){
            state.categories.loaded = action.payload;
        }

    }
})

export const CategoriesReducer = CategoriesSlice.reducer