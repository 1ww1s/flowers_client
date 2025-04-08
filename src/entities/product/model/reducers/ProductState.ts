import {IProductInitialState } from "../types";


export const ProductInitialState: IProductInitialState = {
    product: {
        shops: [],
        data: {
            name: '',
            price: '',
            images: [],
        },
        categories: [],
        composition: [],
        characteristics: []
    },
    isLoading: false,
    error: ''
}