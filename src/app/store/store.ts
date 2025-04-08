import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UserReducer } from "../../entities/user";
import { ProductReducer } from "../../entities/product";
import { SignReducer } from "../../entities/sign";
import { CategoriesReducer, CategoryReducer } from "../../entities/category";
import { ShopReducer } from "../../entities/shop";
import { BannerReducer } from "../../entities/banner";
import { OrderReducer } from "../../entities/order";



const store = configureStore({
    reducer: {
        BannerReducer,
        UserReducer,
        ProductReducer,
        SignReducer,
        CategoryReducer,
        CategoriesReducer,
        ShopReducer,
        OrderReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store