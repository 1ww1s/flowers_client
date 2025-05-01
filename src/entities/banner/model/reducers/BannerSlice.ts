import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BannerInitialState } from "./BannerState";
import { IBanner } from "../types";

export const BannerSlice = createSlice({
    name: 'banner',
    initialState: BannerInitialState,
    reducers: {
        setBanner(state, action: PayloadAction<IBanner>){
            state.banner = action.payload;
        },
        setTitle(state, action: PayloadAction<string>){
            state.banner.title = action.payload;
        },
        setImageDesctop(state, action: PayloadAction<string>){
            state.banner.imageDesctop = action.payload;
        },
        setImageMobile(state, action: PayloadAction<string>){
            state.banner.imageMobile = action.payload;
        },
        setSign(state, action: PayloadAction<string>){
            state.banner.sign = action.payload;
        },
        setButtonLink(state, action: PayloadAction<string>){
            state.banner.buttonLink = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        }
    }
})

export const BannerReducer = BannerSlice.reducer