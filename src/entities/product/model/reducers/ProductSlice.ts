import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInitialState } from "./ProductState";
import { IProduct } from "../types";



export const ProductSlice = createSlice({
    name: 'product',
    initialState: ProductInitialState,
    reducers: {
        setProduct(state, action: PayloadAction<IProduct>){
            state.product = action.payload;
        },
        setId(state, action: PayloadAction<string>){
            state.product.data.id = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setName(state, action: PayloadAction<string>){
            state.product.data.name = action.payload;
        },
        setPrice(state, action: PayloadAction<string>){
            state.product.data.price = action.payload;
        },
        setCategories(state, action: PayloadAction<IProduct['categories']>){
            state.product.categories = action.payload;
        },
        setImages(state, action: PayloadAction<string[]>){
            state.product.data.images = action.payload;
        },
        setShops(state, action: PayloadAction<IProduct['shops']>){
            state.product.shops = action.payload;
        },
        setCharacteristics(state, action: PayloadAction<IProduct['characteristics']>){
            state.product.characteristics = action.payload;
        },
        setCharacteristicValues(state, action: PayloadAction<IProduct['characteristics'][0]>){
            const target = state.product.characteristics.find(ch => ch.name === action.payload.name)
            if(target){
                target.values = action.payload.values;
            }
        },
        setComposition(state, action: PayloadAction<IProduct['composition']>){
            state.product.composition = action.payload;
        }
    }
})

export const ProductReducer = ProductSlice.reducer