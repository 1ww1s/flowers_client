import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "./UserState";
import { IUser } from "../types";



export const UserSlice = createSlice({
    name: 'user',
    initialState: UserInitialState,
    reducers: {
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setName(state, action: PayloadAction<string>){
            state.user.name = action.payload;
        },
        setPhone(state, action: PayloadAction<string>){
            state.user.phone = action.payload;
        },
        setIsAuth(state, action: PayloadAction<boolean>){
            state.user.isAuth = action.payload;
        },
        setRoles(state, action: PayloadAction<string[]>){
            state.user.roles = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>){
            state.user = action.payload;
        },
        setBasket(state, action: PayloadAction<IUser['basket']>){
            state.user.basket = action.payload;
        },
        setFavourites(state, action: PayloadAction<string[]>){
            state.user.favourites = action.payload;
        }
    }
})

export const UserReducer = UserSlice.reducer