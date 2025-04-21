import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInitialState } from "./OrderInitialState";
import { IOrderCreate, TMethodOfReceipt, TStatus } from "../types";

export const OrderSlice = createSlice({
    name: 'orderCreate',
    initialState: OrderInitialState,
    reducers: {
        setInitital(state, action: PayloadAction<null>){
            state.orderCreate = OrderInitialState.orderCreate;
        },
        setStatusOrder(state, action: PayloadAction<TStatus>){
        },
        setProducts(state, action: PayloadAction<IOrderCreate['products']>){
            state.orderCreate.products = action.payload;
        },
        setUnavailableProducts(state, action: PayloadAction<IOrderCreate['unavailableProducts']>){
            state.orderCreate.unavailableProducts = action.payload;
        },
        setStreet(state, action: PayloadAction<IOrderCreate['address']['street']>){
            state.orderCreate.address.street = action.payload;
        },
        setFloor(state, action: PayloadAction<string>){
            state.orderCreate.address.floor = action.payload;
        },
        setApartment(state, action: PayloadAction<string>){
            state.orderCreate.address.apartment = action.payload;
        },
        setEntrance(state, action: PayloadAction<string>){
            state.orderCreate.address.entrance = action.payload;
        },
        setSenderPhone(state, action: PayloadAction<string>){
            state.orderCreate.senderPhone = action.payload;
        },
        setSenderName(state, action: PayloadAction<string>){
            state.orderCreate.senderName = action.payload;
        },
        setRecipientPhone(state, action: PayloadAction<string>){
            state.orderCreate.recipientPhone = action.payload;
        },
        setRecipientName(state, action: PayloadAction<string>){
            state.orderCreate.recipientName = action.payload;
        },
        setMethodOfReceipt(state, action: PayloadAction<TMethodOfReceipt>){
            state.orderCreate.methodOfReceipt = action.payload;
        },
        setDeliveryMessage(state, action: PayloadAction<string>){
            state.orderCreate.address.message = action.payload;
        },
        setMessage(state, action: PayloadAction<string>){
            state.orderCreate.message = action.payload;
        },
        setDeliveryPrice(state, action: PayloadAction<number>){
            state.orderCreate.address.price = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
        state.isLoading = action.payload;
        },
        setShop(state, action: PayloadAction<IOrderCreate['shop']>){
            state.orderCreate.shop = action.payload;
        },
        setMethodPayment(state, action: PayloadAction<IOrderCreate['methodPayment']>){
            state.orderCreate.methodPayment = action.payload;
        }
    }
})

export const OrderReducer = OrderSlice.reducer;