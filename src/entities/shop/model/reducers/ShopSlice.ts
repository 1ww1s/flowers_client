import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopInitialState } from "./ShopState";
import { IShop } from "../types";





export const ShopSlice = createSlice({
    name: 'shop',
    initialState: ShopInitialState,
    reducers: {
        setId(state, action: PayloadAction<number>){
            state.shop.id = action.payload;
        },
        setTitle(state, action: PayloadAction<string>){
            state.shop.title = action.payload;
        },
        setShop(state, action: PayloadAction<IShop>){
            state.shop = action.payload;
        },
        setAddress(state, action: PayloadAction<string>){
            state.shop.address = action.payload;
        },
        setOpeningHours(state, action: PayloadAction<string>){
            state.shop.openingHours = action.payload;
        },
        setCoordinateX(state, action: PayloadAction<number>){
            state.shop.coordinateX = action.payload;
        },
        setCoordinateY(state, action: PayloadAction<number>){
            state.shop.coordinateY = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        }
    }
})

export const ShopReducer = ShopSlice.reducer;