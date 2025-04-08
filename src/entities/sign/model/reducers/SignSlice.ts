import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorInitialState } from "./SignState";






export const SignSlice = createSlice({
    name: 'error',
    initialState: ErrorInitialState,
    reducers: {
        setMessage(state, action: PayloadAction<string>){
            state.sign.message = action.payload;
        },
        setType(state, action: PayloadAction<ISign['type']>){
            state.sign.type = action.payload;
        },
        setSign(state, action: PayloadAction<ISign>){
            state.sign = action.payload;
        }
    } 
})

export const SignReducer = SignSlice.reducer